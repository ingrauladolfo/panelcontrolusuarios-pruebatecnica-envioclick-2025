import { pagesMap, pathToTitle } from '@/assets/data';
import { Loading } from '@/common/components';
import { isPublic } from '@/common/functions/isPublic';
import { DashboardLayout } from '@/pages';
import { lazy, Suspense, useLayoutEffect, useMemo, type ComponentType, type FC, type LazyExoticComponent } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';

const normalize = (p: string) => {
    if (!p) return '/';
    return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
};

export const AppRouter: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const normalizedPath = normalize(pathname === '/' ? '/login' : pathname);

    // mapear lazy components por path normalizado
    const lazyMap = useMemo(() => {
        const m: Record<string, LazyExoticComponent<ComponentType<any>>> = {};
        Object.entries(pagesMap).forEach(([p, loader]) => {
            const key = normalize(p);
            try {
                m[key] = lazy(loader);
            } catch {
                // ignore
            }
        });
        // Asegurar entradas de pathToTitle (por si hay paths sin pagesMap)
        pathToTitle.forEach(({ path }) => {
            const key = normalize(path);
            if (!m[key] && pagesMap[key]) m[key] = lazy(pagesMap[key]);
        });
        return m;
    }, [pagesMap, pathToTitle]);

    // rutas públicas (no dashboard)
    const publicPaths = useMemo(() => {
        return pathToTitle
            .map(({ path }) => normalize(path))
            .filter(p => isPublic(p) && !p.startsWith('/dashboard'));
    }, [pathToTitle]);

    // rutas dentro de /dashboard como children (home, users, users/:id, etc)
    const dashboardChildren = useMemo(() => {
        return pathToTitle
            .map(({ path, title }) => ({ path: normalize(path), title }))
            .filter(p => p.path.startsWith('/dashboard'))
            .map(p => {
                // child path relativo (ej. '/dashboard/home' -> 'home', '/dashboard/users/:id' -> 'users/:id')
                const rel = p.path === '/dashboard' ? '' : p.path.replace(/^\/dashboard\/?/, '');
                const Comp = lazyMap[p.path];
                const element = Comp ? (
                    <Suspense key={p.path} fallback={<Loading />}>
                        <Comp />
                    </Suspense>
                ) : (
                    <div key={p.path}>Página en construcción</div>
                );
                return { path: rel || undefined, element, rawPath: p.path };
            });
    }, [pathToTitle, lazyMap]);

    // matchedRoute para título
    const matchedRoute = useMemo(() => {
        // exact match
        const exact = pathToTitle.find(p => normalize(p.path) === normalizedPath);
        if (exact) return exact;
        // fallback: match simple param pattern (':id')
        return pathToTitle.find(p => {
            const route = normalize(p.path);
            if (!route.includes(':')) return false;
            const pattern = route.replace(/:[^/]+/g, '[^/]+').replace(/\//g, '\\/');
            const re = new RegExp(`^${pattern}$`);
            return re.test(normalizedPath);
        });
    }, [normalizedPath]);

    useLayoutEffect(() => {
        document.title = matchedRoute?.title ?? 'Mi aplicación';
    }, [matchedRoute]);

    useLayoutEffect(() => {
        // si la entrada canonical en pathToTitle difiere (p. ej. navegamos "/"
        if (!matchedRoute) return;
        const canonical = normalize(matchedRoute.path);
        if (canonical && normalizedPath !== canonical) {
            navigate(canonical, { replace: true });
        }
    }, [matchedRoute, normalizedPath, navigate]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />

            {/* Rutas públicas (no dashboard) */}
            {publicPaths.map(p => {
                const Comp = lazyMap[p];
                return (
                    <Route
                        key={p}
                        path={p}
                        element={
                            <Suspense fallback={<Loading />}>
                                {Comp ? <Comp /> : <div>Página en construcción</div>}
                            </Suspense>
                        }
                    />
                );
            })}

            {/* Dashboard con children concretos envueltos en Suspense */}
            <Route
                path="/dashboard/*"
                element={
                    <Suspense fallback={<Loading />}>
                        <DashboardLayout />
                    </Suspense>
                }
            >
                {/* index dentro de dashboard -> redirigir a home */}
                <Route index element={<Navigate to="home" replace />} />

                {dashboardChildren.map((c) => (
                    <Route
                        key={c.rawPath}
                        path={c.path} // undefined => index (handled above)
                        element={c.element}
                    />
                ))}

                {/* fallback dentro del dashboard */}
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<Loading />}>
                            <div>Página no encontrada</div>
                        </Suspense>
                    }
                />
            </Route>

            {/* Fallback global */}
            <Route
                path="*"
                element={
                    <Suspense fallback={<Loading />}>
                        <div>Página no encontrada</div>
                    </Suspense>
                }
            />
        </Routes>
    );
};

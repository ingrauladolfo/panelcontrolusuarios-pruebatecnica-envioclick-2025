// DashboardUserDetails.tsx
import { useLayoutEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '@/common/styles/pages/Dashboard/Users/UserDetails/index.css';
import { Button, Card } from '@/common/components';
import { useUserDetailsStore } from '@/common/stores/pages/Dashboard/Users/UserDetails';

export const DashboardUserDetails: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading, getUser, resetUser, messages, getMessages } = useUserDetailsStore();

    // resolver id desde query
    const resolveId = (): string | null => {
        const sp = new URLSearchParams(location.search);
        return sp.get('id');
    };

    const id = resolveId();

    useLayoutEffect(() => {
        if (id) {
            getUser(id);
            getMessages(id);
        }
    }, [id, getUser, getMessages]);

    useLayoutEffect(() => {
        return () => {
            resetUser();
        };
    }, [resetUser]);

    const formatDate = (iso?: string) => {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        const pad = (n: number) => String(n).padStart(2, '0');
        const dd = pad(d.getDate());
        const mm = pad(d.getMonth() + 1);
        const yyyy = d.getFullYear();
        const hh = pad(d.getHours());
        const min = pad(d.getMinutes());
        return `${dd}/${mm}/${yyyy} - ${hh}:${min}`;
    };

    if (!id) {
        return <div className="error-message">No se encontró el ID del usuario</div>;
    }

    if (loading) {
        return <div className="loading-message">Cargando usuario...</div>;
    }

    if (!user) {
        // si aquí aún no hay usuario, mostrar mensaje diagnóstico útil en vez de fallo silencioso
        return <div className="error-message">No se encontró el usuario con id: <strong>{id}</strong></div>;
    }
    return (
        <div className="user-details-grid">
            {/* Left: detalle */}
            <div className="user-details-column">
                <Card type="detail" user={user}>
                    <p>Género: {user.gender}</p>
                    <p>Edad: {user.dob?.age}</p>
                    <p>Nacionalidad: {user.nat}</p>
                    <p>Email: {user.email}</p>
                    <p>Teléfono: {user.phone}</p>
                    <p>Celular: {user.cell}</p>
                </Card>
            </div>
            {messages && messages.length > 0 && (
                // Right: historial de mensajes
                <div className="user-details-column">
                    <Card type="detail" user={user} image={user.picture.medium} title={`Historial de mensajes con ${user.name?.title ?? ''} ${user.name?.first ?? ''} ${user.name?.last ?? ''}`}>
                        <div className="message-history">
                            {messages.map((m: any, idx: number) => (
                                <div className="message-item" key={idx}>
                                    <div className="message-title">{m.title}</div>
                                    <div className="message-content">{m.content}</div>
                                    <div className="message-date">{formatDate(m.date)}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
            <div className="button-container">
                <Button
                    type="button"
                    className="regresar-button"
                    bgColor='#3e8e41'
                    onClick={() => navigate('/dashboard/users')}
                >
                    Regresar
                </Button>
            </div>
        </div>
    );
};
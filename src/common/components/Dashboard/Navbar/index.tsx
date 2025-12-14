// Navbar.tsx
import { useLayoutEffect, type FC } from 'react'
import '@/common/styles/components/Navbar/index.css'
import { Sidebar } from '../Sidebar'
import { UserProfile } from '../UserProfile'
import { useUIStore } from '@/common/stores/components/Sidebar'
import { useUserStore } from '@/common/stores/components/Navbar'

export const Navbar: FC = () => {
    const { sidebarOpen, setSidebarOpen } = useUIStore()

    const user = useUserStore(s => s.user)
    const loadFromStorage = useUserStore(s => s.loadFromStorage)

    // derive initials from user so it updates when `user` is set
    const initials = useUserStore(s => {
        const u = s.user
        if (!u) return null
        const f = String(u.name?.first ?? '').trim()
        const l = String(u.name?.last ?? '').trim()
        return `${(f[0] ?? '')}${(l[0] ?? '')}`.toUpperCase()
    })

    const showLogoutModal = useUserStore(s => s.showLogoutModal)
    const openLogoutModal = useUserStore(s => s.openLogoutModal)
    const closeLogoutModal = useUserStore(s => s.closeLogoutModal)
    const confirmLogout = useUserStore(s => s.confirmLogout)

    // hydrate user once on mount so initials are available immediately after mount
    useLayoutEffect(() => {
        loadFromStorage()
    }, [loadFromStorage])

    return (
        <header className="app-navbar">
            <div className="navbar-left">
                <button
                    className="menu-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰
                </button>
                {/*                 <span className="brand">MiApp</span>
 */}            </div>

            <div className="navbar-right">
                <UserProfile
                    user={user}
                    initials={initials}
                    loadFromStorage={loadFromStorage}
                    showLogoutModal={showLogoutModal}
                    openLogoutModal={openLogoutModal}
                    closeLogoutModal={closeLogoutModal}
                    confirmLogout={confirmLogout}
                    confirmText="Aceptar"
                    cancelText="Cancelar"
                />
            </div>

            <Sidebar />
        </header>
    )
}

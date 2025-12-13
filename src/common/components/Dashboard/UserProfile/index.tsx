import { useLayoutEffect, useRef, useState, type FC } from 'react'
import '@/common/styles/components/Navbar/index.css'
import { Modal } from '../../shared/Modal'

interface Props {
    user: any
    initials: string | null
    loadFromStorage: () => void
    showLogoutModal: boolean
    openLogoutModal: () => void
    closeLogoutModal: () => void
    confirmLogout: () => void
    confirmText: string;
    cancelText: string;
}

export const UserProfile: FC<Props> = ({
    user,
    initials,
    loadFromStorage,
    showLogoutModal,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
    confirmText,
    cancelText
}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])

    useLayoutEffect(() => {
        if (open) loadFromStorage()
    }, [open, loadFromStorage])

    return (
        <div className="user-profile" ref={ref}>
            <button className="avatar-btn" onClick={() => setOpen(!open)}>
                {initials ?? 'Perfil'}
            </button>

            {open && (
                <div className="profile-dropdown">
                    {!user && <div className="pd-empty">Usuario no encontrado</div>}

                    {user && (
                        <div className="pd-content">
                            <div className="pd-name">
                                {user.name.title} {user.name.first} {user.name.last}
                            </div>
                            <div className="pd-email">{user.email}</div>

                            <button className="logout-btn" onClick={openLogoutModal}>
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showLogoutModal && (
                <Modal
                    message="¿Deseas cerrar sesión?"
                    onConfirm={confirmLogout}
                    onClose={closeLogoutModal}
                    confirmText={confirmText}
                    cancelText={cancelText}
                />
            )}
        </div>
    )
}

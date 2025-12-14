import { useLayoutEffect, useRef, useState, type FC } from 'react'
import '@/common/styles/components/Navbar/index.css'
import { Modal } from '../../shared/Modal'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import type { UserProfileProps } from '@/common/interfaces'
import { Button } from '@/common/components/shared/Button' // ajusta ruta si aplica

export const UserProfile: FC<UserProfileProps> = ({
    user,
    initials,
    loadFromStorage,
    showLogoutModal,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
    confirmText,
    cancelText,
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
            {/* Avatar toggle usando Button compartido */}
            <Button className="avatar-btn" type="button" onClick={() => setOpen(v => !v)} bgColor="#333333" color='#F7F7F7'>
                {user?.picture?.thumbnail ? (
                    <img src={user.picture.thumbnail} alt="Avatar" className="avatar-image" />
                ) : null}
                <span className="avatar-initials">{initials ?? 'Perfil'}</span>
            </Button>

            {open && (
                <div className="profile-dropdown">
                    {!user && <div className="pd-empty">Usuario no encontrado</div>}

                    {user && (
                        <div className="pd-content">
                            <div className="pd-name">
                                <FaUser className="pd-icon" />
                                {user.name.title} {user.name.first} {user.name.last}
                            </div>
                            <div className="pd-email">
                                <FaEnvelope className="pd-icon" />
                                {user.email}
                            </div>

                            {/* Logout usando Button compartido */}
                            <Button className="logout-btn" type="button" onClick={openLogoutModal} bgColor="#333333" color='#F7F7F7'>
                                Cerrar sesión
                            </Button>
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

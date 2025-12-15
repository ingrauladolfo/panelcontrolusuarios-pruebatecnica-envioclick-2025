import { useLayoutEffect, useRef, type FC, type FormEvent } from 'react'
import '@/common/styles/pages/Login/index.css'
import { useLoginStore } from '@/common/stores/pages/Login'
import { Modal } from '@/common/components'
import { useNavigate } from 'react-router'

export const Login: FC = () => {
    const { username, password, setUsername, setPassword, fetchUsers, showModal, modalMessage, handleCloseModal, handleLogin } = useLoginStore()
    const fetchedRef = useRef(false)
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!fetchedRef.current) {
            fetchUsers()
            fetchedRef.current = true
        }
    }, [fetchUsers])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await handleLogin(navigate)
    }

    return (
        <div className="login-viewport">
            <div className="login-container" role="region" aria-labelledby="login-title">
                <h2 id="login-title" className="login-title">
                    Iniciar sesión
                </h2>
                <hr className="login-hr" />
                <form className="login-form" onSubmit={onSubmit} aria-label="login-form">
                    <div className="login-field">
                        <label className="login-label" htmlFor="username">
                            Usuario
                        </label>
                        <input id="username" name="username" type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ingrese su usuario" autoComplete="username" />
                    </div>

                    <div className="login-field">
                        <label className="login-label" htmlFor="password">
                            Contraseña
                        </label>
                        <input id="password" name="password" type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su contraseña" autoComplete="current-password" />
                    </div>

                    <button className="login-button" type="submit" aria-label="Iniciar sesión">
                        Iniciar sesión
                    </button>
                </form>
            </div>

            {/* Modal se renderiza aquí para garantizar que quede por encima del formulario.
          Estilos de overlay se controlan en CSS (.modal-root / .modal-sheet). */}
            {showModal && <Modal message={modalMessage} onClose={handleCloseModal} cancelText={'Aceptar'} />}
        </div>
    )
}

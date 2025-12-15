import { useLayoutEffect, useState, useRef, useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '@/common/styles/pages/Dashboard/Users/UserDetails/index.css';
import { Button, Card, Modal } from '@/common/components';
import { useUserDetailsStore } from '@/common/stores/pages/Dashboard/Users/UserDetails';

export const DashboardUserDetails: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        user,
        loading,
        getUser,
        resetUser,
        messages,
        getMessages,
        formatMessagesDate,
        formatDate,
        getGenderLabel,
        getCountryName,
        getFullAddress,
        handleCopyCoordinates,
        formatTimePeriod
    } = useUserDetailsStore();

    // context menu state
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);

    // modal state for copy feedback
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [copyMessage, setCopyMessage] = useState(''); // texto que mostrará el modal

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

    // hide menu on outside click / escape / scroll
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!(e.target instanceof Node)) return;
            if (!menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
        window.addEventListener('click', onDocClick);
        window.addEventListener('keydown', onEsc);
        window.addEventListener('scroll', () => setMenuOpen(false), true);
        return () => {
            window.removeEventListener('click', onDocClick);
            window.removeEventListener('keydown', onEsc);
            window.removeEventListener('scroll', () => setMenuOpen(false), true);
        };
    }, []);

    const formatCoordinates = (loc?: any) => {
        const lat = loc?.coordinates?.latitude ?? '';
        const lon = loc?.coordinates?.longitude ?? '';
        const nLat = String(lat).replace(/[^\d\.\-]/g, '');
        const nLon = String(lon).replace(/[^\d\.\-]/g, '');
        return `${nLat}, ${nLon}`;
    };

    const onAddressContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
    };

    const onCopyClick = async () => {
        const coords = formatCoordinates(user?.location);
        const ok = await handleCopyCoordinates(coords);
        if (ok) {
            setCopyMessage('Copiado en el portapapeles');
        } else {
            setCopyMessage('No se pudo copiar las coordenadas');
        }
        setMenuOpen(false);
        setShowCopyModal(true);
    };

    if (!id) return <div className="error-message">No se encontró el ID del usuario</div>;
    if (loading) return <div className="loading-message">Cargando usuario...</div>;
    if (!user) return <div className="error-message">No se encontró el usuario con id: <strong>{id}</strong></div>;

    return (
        <div className="user-details-grid">
            {/* Left: detalle */}
            <div className="user-details-column">
                <Card type="detail" user={user}>
                    <p>Género: {getGenderLabel(user?.gender)}</p>
                    <p>Fecha: {formatDate(user?.dob?.date)}</p>
                    <p>Edad: {formatTimePeriod(user?.dob?.age)}</p>
                    <p>Nacionalidad: {getCountryName(user.nat)}</p>
                    <p>Email: {user?.email}</p>
                    <p>Teléfono: {user?.phone}</p>
                    <p>Celular: {user?.cell}</p>
                    <p>Dirección:<span onContextMenu={onAddressContextMenu} title="Click derecho para ver opciones" aria-label="Dirección del usuario"> {getFullAddress(user?.location)}</span></p>
                    <p>Fidelidad: {formatTimePeriod(user?.registered?.age)}</p>
                    <p>Miembro desde: {formatDate(user?.registered?.date)} </p>

                    {/* Dirección: attach contextmenu */}
                    {/*  <div
                        title="Click derecho para ver opciones"
                        aria-label="Dirección del usuario"
                    >
                    </div> */}
                </Card>
            </div>

            {/* Right: historial de mensajes (si existen) */}
            {messages && messages.length > 0 && (
                <div className="user-details-column">
                    <Card type="detail" user={user} image={user.picture.medium} title={`Historial de mensajes con ${user.name?.title ?? ''} ${user.name?.first ?? ''} ${user.name?.last ?? ''}`}>
                        <div className="message-history">
                            {messages.map((m: any, idx: number) => (
                                <div className="message-item" key={idx}>
                                    <div className="message-title">{m.title}</div>
                                    <div className="message-content">{m.content}</div>
                                    <div className="message-date">{formatMessagesDate(m.date)}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* button row */}
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

            {/* custom context menu */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="custom-context-menu"
                    style={{ left: menuPos.x, top: menuPos.y }}
                    role="menu"
                >
                    <div className="coords-value" onClick={onCopyClick}>
                        {formatCoordinates(user?.location)}
                    </div>
                </div>
            )}

            {/* modal feedback after copy */}
            {showCopyModal && (
                <Modal
                    message={copyMessage}
                    onClose={() => setShowCopyModal(false)}
                    onConfirm={() => setShowCopyModal(false)}
                    confirmText="Aceptar"
                />
            )}
        </div>
    );
};

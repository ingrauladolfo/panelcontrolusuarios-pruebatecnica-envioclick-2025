import { useDashboardHomeStore } from '@/common/stores/pages/Dashboard/Home';
import '@/common/styles/pages/Dashboard/Home/index.css';
import { useLayoutEffect, type JSX } from 'react';
import { FaHome, FaUsers } from 'react-icons/fa';
import { Button } from '@/common/components';
import { useNavigate } from 'react-router';

export const DashboardHome = () => {
    const { userProfile, buttons, loadUserProfile, loadButtons, getSaludo } = useDashboardHomeStore();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        loadUserProfile();
        loadButtons();
    }, [loadUserProfile, loadButtons]);

    if (!userProfile) return <div className="loading">Cargando...</div>;

    const saludo = getSaludo(userProfile.name.title);

    const icons: Record<string, JSX.Element> = {
        Inicio: <FaHome />,
        Usuarios: <FaUsers />,
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <div className="dashboard-home">
            <h1 className="saludo">
                {saludo} {userProfile.name.title} {userProfile.name.first} {userProfile.name.last} al panel de control de usuarios de <img src="/assets/img/isologo-envioclick.webp" alt="Logo de Envioclic" />
            </h1>

            <div className="buttons">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        onClick={() => handleNavigate(button.path)}
                        type="button"
                        bgColor="#333333"
                        color="#F7F7F7"
                    >
                        <span className="button-content">
                            {icons[button.title] && <span className="icon">{icons[button.title]}</span>}
                            <span className="label">{button.title}</span>
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

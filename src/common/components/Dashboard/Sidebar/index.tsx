import { useUIStore } from '@/common/stores/components/Sidebar';
import '@/common/styles/components/Navbar/index.css';
import type { FC } from 'react';

export const Sidebar: FC = () => {
    const { sidebarOpen, setSidebarOpen } = useUIStore();

    return (
        <aside className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-inner">
                <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                    ×
                </button>

                <nav>
                    <ul>
                        <li>Inicio</li>
                        <li>Proyectos</li>
                        <li>Configuración</li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

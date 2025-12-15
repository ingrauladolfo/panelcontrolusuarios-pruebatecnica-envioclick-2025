// Sidebar.tsx
import { useUIStore } from '@/common/stores/components/Sidebar';
import '@/common/styles/components/Navbar/index.css';
import type { FC } from 'react';
import { FaX } from 'react-icons/fa6';
import { useLayoutEffect } from 'react';

export const Sidebar: FC = () => {
    const { sidebarOpen, setSidebarOpen, titles, loadTitles } = useUIStore();

    useLayoutEffect(() => {
        loadTitles();
    }, [loadTitles]);

    return (
        <aside className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-inner">
                <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                    <FaX />
                </button>

                <nav>
                    <ul>
                        {titles.map((item, index) => (
                            <li key={index} className="sidebar-item">
                                <a href={item.path} className="sidebar-link">
                                    <span className="sidebar-icon">
                                        {item.icon && <item.icon />}
                                    </span>
                                    {item.title}
                                </a>
                            </li>
                        ))}

                    </ul>
                </nav>
            </div>
        </aside>
    );
};
import { pathToTitle } from '@/assets/data';
import { useUIStore } from '@/common/stores/components/Sidebar';
import '@/common/styles/components/Navbar/index.css';
import type { FC } from 'react';
import { FaHome, FaUsers } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

export const Sidebar: FC = () => {
    const { sidebarOpen, setSidebarOpen } = useUIStore();

    const titles = pathToTitle.map((item) => {
        if (item.path.startsWith('/dashboard') && !item.path.includes('/:id')) {
            const title = item.title.split('|')[0].split('Dashboard - ')[1].trim();
            let icon;
            if (item.path === '/dashboard/home') {
                icon = <FaHome />;
            } else if (item.path === '/dashboard/users') {
                icon = <FaUsers />;
            }
            return { path: item.path, title, icon };
        }
        return null;
    }).filter((item) => item !== null);
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
                                    <span className="sidebar-icon">{item.icon}</span>
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
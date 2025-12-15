import { create } from 'zustand';
import { pathToTitle } from '@/assets/data';
import { FaHome, FaUsers } from 'react-icons/fa';
import type { IconType } from 'react-icons';

type UIState = {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
    titles: { path: string; title: string; icon?: IconType }[];
    loadTitles: () => void;
};

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: false,
    setSidebarOpen: (value) => set({ sidebarOpen: value }),
    titles: [],
    loadTitles: () => {
        const allowed = ['/dashboard/home', '/dashboard/users'];

        const formattedButtons = pathToTitle
            .filter((item) => allowed.includes(item.path))
            .map((item) => {
                const beforePipe = item.title.split('|')[0].trim();
                const title = beforePipe.replace('Dashboard -', '').trim();

                let icon: IconType | undefined;
                if (item.path === '/dashboard/home') icon = FaHome;
                if (item.path === '/dashboard/users') icon = FaUsers;

                return { path: item.path, title, icon };
            });

        set({ titles: formattedButtons });
    },
}));

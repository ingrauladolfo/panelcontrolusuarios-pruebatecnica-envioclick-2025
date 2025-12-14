// useDashboardHomeStore.ts
import { pathToTitle } from '@/assets/data';
import type { DashboardHomeState } from '@/common/interfaces';
import { create } from 'zustand';

export const useDashboardHomeStore = create<DashboardHomeState>((set) => ({
    userProfile: null,
    buttons: [],
    loadUserProfile: () => {
        const storedUserProfile = localStorage.getItem('userProfile');
        if (storedUserProfile) {
            set({ userProfile: JSON.parse(storedUserProfile) });
        }
    },
    loadButtons: () => {
        const dashboardButtons = pathToTitle.filter((item) => item.path.startsWith('/dashboard') && !item.path.includes('/:id'));
        const formattedButtons = dashboardButtons.map((item) => {
            const title = item.title.split('|')[0].split('Dashboard - ')[1].trim();
            return { path: item.path, title };
        });
        set({ buttons: formattedButtons });
    },
    getSaludo: (title: string) => {
        const maleTitles = ['Mr', 'Mr.', 'Master'];
        const femaleTitles = ['Miss', 'Mrs', 'Mrs.', 'Ms', 'Ms.', 'Lady', 'Dame'];

        if (maleTitles.includes(title)) {
            return 'Bienvenido';
        } else if (femaleTitles.includes(title)) {
            return 'Bienvenida';
        } else {
            return 'Bienvenido/a';
        }
    },
}));


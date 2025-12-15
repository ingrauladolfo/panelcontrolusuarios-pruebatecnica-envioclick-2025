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
        // Solo aceptar rutas exactas cuya UI quieres mostrar
        const allowed = ['/dashboard/home', '/dashboard/users'];

        const dashboardButtons = pathToTitle.filter((item) =>
            allowed.includes(item.path)
        );

        const formattedButtons = dashboardButtons.map((item) => {
            // tomar la parte antes de '|' y luego lo que sigue a 'Dashboard -'
            const beforePipe = (item.title ?? '').split('|')[0].trim();
            const title =
                beforePipe.includes('Dashboard -')
                    ? beforePipe.split('Dashboard -')[1].trim()
                    : beforePipe;
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

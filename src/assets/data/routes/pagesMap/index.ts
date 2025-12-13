import { Login, DashboardHome, DashboardUsers } from '@/pages';

export const pagesMap: Record<string, () => Promise<{ default: any }>> = {
    '/': () => Promise.resolve({ default: Login }),
    '/login': () => Promise.resolve({ default: Login }),
    '/dashboard/home': () => Promise.resolve({ default: DashboardHome }),
    '/dashboard/users': () => Promise.resolve({ default: DashboardUsers }),
    '/dashboard/users/:id': () => Promise.resolve({ default: DashboardUsers }),
};
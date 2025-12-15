import { Login, DashboardHome, DashboardUsers, DashboardUserDetails } from '@/pages';

export const pagesMap: Record<string, () => Promise<{ default: any }>> = {
    '/': () => Promise.resolve({ default: Login }),
    '/login': () => Promise.resolve({ default: Login }),
    '/dashboard/home': () => Promise.resolve({ default: DashboardHome }),
    '/dashboard/users': () => Promise.resolve({ default: DashboardUsers }),
    '/dashboard/user': () => Promise.resolve({ default: DashboardUserDetails }),
};
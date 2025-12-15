export interface UserDashboardHomeProfile {
    name: {
        title: string;
        first: string;
        last: string;
    };
}

export interface DashboardHomeState {
    userProfile: UserDashboardHomeProfile | null;
    buttons: { path: string; title: string }[];
    loadUserProfile: () => void;
    loadButtons: () => void;
    getSaludo: (title: string) => string;
}
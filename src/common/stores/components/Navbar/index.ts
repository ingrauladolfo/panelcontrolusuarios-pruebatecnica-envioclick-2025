import { create } from 'zustand'

export type RandomUser = {
    email: string
    name: { title: string; first: string; last: string }
    login?: { username?: string }
    [k: string]: any
}

type UserState = {
    user: RandomUser | null
    showLogoutModal: boolean

    loadFromStorage: () => void
    openLogoutModal: () => void
    closeLogoutModal: () => void
    confirmLogout: () => void
    computeInitials: () => string | null
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    showLogoutModal: false,

    loadFromStorage: () => {
        const raw = localStorage.getItem('userProfile')
        if (!raw) return
        try {
            set({ user: JSON.parse(raw) })
        } catch {
            set({ user: null })
        }
    },

    openLogoutModal: () => set({ showLogoutModal: true }),
    closeLogoutModal: () => set({ showLogoutModal: false }),

    confirmLogout: () => {
        localStorage.removeItem('userProfile')
        set({ user: null, showLogoutModal: false })
        window.location.replace('/')
    },

    computeInitials: () => {
        const u = get().user
        if (!u) return null
        return `${u.name.first[0]}${u.name.last[0]}`.toUpperCase()
    },
}))

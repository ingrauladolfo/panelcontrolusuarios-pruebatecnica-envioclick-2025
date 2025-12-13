import { create } from 'zustand'
import axios from 'axios'
import type { StoreLogin } from '@/common/interfaces'

export const useLoginStore = create<StoreLogin>((set, get) => ({
    users: [],
    username: '',
    password: '',
    showModal: false,
    modalMessage: '',
    hasFetched: false,

    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),

    fetchUsers: async () => {
        if (get().hasFetched) return
        set({ hasFetched: true })

        try {
            const res = await axios.get('https://randomuser.me/api/?results=10')
            set({ users: res.data.results })
        } catch {
            set({
                hasFetched: false,
                showModal: true,
                modalMessage: 'Error al obtener usuarios',
            })
        }
    },

    login: async () => {
        const { username, password, users } = get()

        const user = users.find(
            (u: any) =>
                u.login?.username === username &&
                u.login?.password === password
        )

        if (!user) {
            set({
                showModal: true,
                modalMessage: 'Usuario o contraseña incorrectos',
            })
            return false
        }

        localStorage.setItem('userProfile', JSON.stringify(user))

        set({
            showModal: true,
            modalMessage: 'Inicio de sesión exitoso',
        })

        return true
    },

    handleSubmit: async (e) => {
        e.preventDefault()
        await get().login()
    },

    handleLogin: async (navigate) => {
        const ok = await get().login()
        if (ok) navigate('/dashboard/home')
    },

    handleCloseModal: () => set({ showModal: false }),
}))

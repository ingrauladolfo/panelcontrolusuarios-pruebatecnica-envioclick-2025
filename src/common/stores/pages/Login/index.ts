// useLoginStore.ts
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
            // traer usuarios completos (sin guardar nacionalidades aún)
            const usersRes = await axios.get('https://randomuser.me/api/?results=101')
            set({ users: usersRes.data.results })
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

        // guardar perfil y usuarios
        localStorage.setItem('userProfile', JSON.stringify(user))
        localStorage.setItem('users', JSON.stringify(users))

        // calcular nacionalidades únicas a partir de los usuarios y guardarlas al iniciar sesión
        try {
            const nationalities = [
                ...new Set(users.map((u: any) => u.nat).filter(Boolean))
            ]
            localStorage.setItem('userNationalities', JSON.stringify(nationalities))
        } catch {
            // no bloquear el login si falla al guardar nacionalidades
        }

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

import { create } from 'zustand'
import { getUser } from '../services/api'
import type { User } from '@/services/inteface'

interface UserState {
    user: User | null
    token: string
    setUserData: (userData: User, token: string) => void
    clearUserData: () => void
    fetchUserData: () => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    token: '',

    setUserData: (userData, token) =>
        set(() => ({
            user: userData,
            token,
        })),

    clearUserData: () => {
        localStorage.removeItem('token')
        set(() => ({
            user: null,
            token: '',
        }))
    },

    fetchUserData: async () => {
        try {
            let token = get().token

            if (!token) {
                token = localStorage.getItem('token') || ''
                set({ token })
            }

            if (!token) {
                throw new Error('No token found')
            }

            const response = await getUser()

            if (response) {
                set({ user: response })
            }
        } catch (error) {
            // toast.error("Gagal mengambil data user.");
            console.log(error)
            get().clearUserData()
        }
    },
}))

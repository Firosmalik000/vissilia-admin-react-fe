import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export const handleApiError = (err: unknown) => {
    const error = err as AxiosError<{ message?: string; errors?: Record<string, string[]> }>

    // Ambil pesan utama
    let message = error.response?.data?.message || error.message || 'Terjadi kesalahan'

    // Kalau ada multiple errors dari backend (misalnya Laravel validation)
    if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        message = Object.values(errors).flat().join(', ')
    }

    toast.error(message)
}

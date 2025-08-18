import type { CategoryResponse, LoginPayload, LoginResponse, ProductApiResponse, User } from './inteface'
import api from './interceptor'

const API_URL: string = import.meta.env.VITE_API_URL as string

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>(`${API_URL}/admin/auth/login`, payload)
    return res.data
}

export const getUser = async (): Promise<User> => {
    const response = await api.get<{ user: User }>(`${API_URL}/admin/check-user`)
    return response.data.user
}

export const getProduct = async (page: number = 1, perPage: number = 10, category?: string, search?: string): Promise<ProductApiResponse> => {
    const params: Record<string, string | number> = { page, per_page: perPage }
    if (category && category !== 'Semua') params.category = category
    if (search) params.search = search

    const response = await api.get<ProductApiResponse>(`${API_URL}/admin/products`, {
        params,
    })
    return response.data
}

export const getCategoryActive = async (): Promise<CategoryResponse> => {
    const response = await api.get<CategoryResponse>(`${API_URL}/admin/categories/active`)
    return response.data
}

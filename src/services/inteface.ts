export interface LoginPayload {
    identifier: string
    password: string
    device_id: string
}

export interface LoginResponse {
    token: string
    user: {
        id: number
        name: string
        email: string
    }
}

export interface User {
    id: number
    name: string
    slug: string
    email: string
    balance: number
    phone: string
    email_verified_at: string | null
    role: string
    is_active: number
    membership_type: string | null
    bank_full_name: string | null
}

export interface Creator {
    id: number
    name: string
}

export interface Product {
    id: number
    name: string
    slug: string
    image: string
    weight: number
    image_details: string[]
    updated_by: number | null
    is_release: boolean
    primary_image: string | null
    price: number
    final_price: number
    total_sold: number
    creator: Creator
}

export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface ProductApiResponse {
    data: Product[]
    pagination: Pagination
    message: string
}

export interface Category {
    id: number
    name: string
    is_release: number
}

export interface CategoryResponse {
    data: Category[]
    message: string
}

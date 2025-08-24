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

export interface ResponseSuccess {
    message: string
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

export interface Type {
    id: number
    product_id: number
    variant: string
    price: number
    discount_amount: number
    discountPercentage: number
    final_price: number
    description: string
    image: string
    is_active: number
    is_release: number
    total_sold: number
    updated_by: number | null
    stock: number
}

export interface Product {
    id: number
    name: string
    slug: string
    image: string
    types: Type[]
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
// export interface Product {
//     id: number
//     name: string
//     slug: string
//     image: string
//     weight: number
//     image_details: string[]
//     updated_by: number | null
//     is_release: boolean
//     primary_image: string | null
//     price: number
//     final_price: number
//     total_sold: number
//     creator: Creator
// }

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
export interface ProductDetailApiResponse {
    data: Product
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

export interface OrderResponse {
    data: Order[]
    pagination: Pagination
}

export interface Order {
    id: number
    order_id: string
    user_id: number
    type: string
    total_price: number
    discount_amount: number
    final_amount: number
    total_cashback: number
    currency: string
    status: string
    progress: string
    is_kado_cinta: number
    shipping_cost: number
    expired_at: string | null
    created_at: string
    updated_at: string
    details: OrderDetail[]
    payment: Payment
    shipment: Shipment
}

export interface OrderDetail {
    id: number
    order_id: number
    product_name: string
    quantity: number
    final_price: number
}

export interface Payment {
    id: number
    order_id: number
    payment_method: string
    amount: number
    status: string
    paid_at: string | null
}

export interface Shipment {
    id: number
    order_id: number
    courier: string
    shipping_status: string
    recipient_name: string
    recipient_address: string
    recipient_city: string
    recipient_province: string
    recipient_postcode: string
    tracking_number: string | null
}

export interface KadoCintaCategory {
    id: number
    name: string
    is_active: boolean
    is_release: boolean
    created_at: string
    updated_at: string
}

export interface KadoCintaCategoryResponse {
    data: KadoCintaCategory[]
    message: string
}

export interface ResponseListUser {
    data: User[]
    message: string
}

export interface ProductHeader {
    id: number
    name: string
    slug: string
    image: string
    weight: number
    price: number
    final_price: number
    image_details: string
    is_release: number
    total_sold: number
    primary_image: string | null
    updated_by: number | null
}

export interface ProductKadoCinta {
    id: number
    product_id: number
    variant: string
    price: number
    discount_amount: number
    discountPercentage: number
    final_price: number
    description: string
    image: string
    is_active: number
    is_release: number
    total_sold: number
    updated_by: number | null
    stock: number
    product_header: ProductHeader
}

export interface KadoCinta {
    id: number
    order_id: string | null
    user_id: number
    kado_cinta_category_id: number
    category_name: string
    kado_name: string
    description: string
    type: string
    quantity: number
    final_price: number
    cashback_amount: number
    is_progress: number
    shipment_method: string | null
    process_at: string | null
    updated_at: string | null
    created_at: string
    product: ProductKadoCinta
}

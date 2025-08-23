/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CategoryResponse, KadoCinta, KadoCintaCategoryResponse, LoginPayload, LoginResponse, OrderResponse, ProductApiResponse, ResponseListUser, ResponseSuccess, User } from './inteface';
import api from './interceptor';

const API_URL: string = import.meta.env.VITE_API_URL as string;

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(`${API_URL}/admin/auth/login`, payload);
  return res.data;
};

export const getUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>(`${API_URL}/admin/check-user`);
  return response.data.user;
};

export const getProduct = async (page: number = 1, perPage: number = 10, category?: string, search?: string): Promise<ProductApiResponse> => {
  const params: Record<string, string | number> = { page, per_page: perPage };
  if (category && category !== 'Semua') params.category = category;
  if (search) params.search = search;

  const response = await api.get<ProductApiResponse>(`${API_URL}/admin/products`, {
    params,
  });
  return response.data;
};
export const postProduct = async (payload: any): Promise<any> => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  const response = await api.post(`${API_URL}/admin/products`, formData);

  return response.data;
};

export const getCategoryActive = async (): Promise<CategoryResponse> => {
  const response = await api.get<CategoryResponse>(`${API_URL}/admin/categories/active`);
  return response.data;
};
// Orders
export const getOrders = async (page: number = 1, perPage: number = 10, status?: string, search?: string): Promise<OrderResponse> => {
  const params: Record<string, string | number> = { page, per_page: perPage };
  if (status && status !== 'Semua') params.status = status;
  if (search) params.search = search;
  const response = await api.get<OrderResponse>(`${API_URL}/admin/orders`, {
    params,
  });
  return response.data;
};

export const updateResi = async (id_order: number, resi: string): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/orders/updateResi`, { id_order, resi });
  return response.data;
};

export const markAsDelivered = async (id_order: number): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/orders/markDelivered`, { id_order });
  return response.data;
};

export const updatePayment = async (id_order: number, data: string): Promise<ResponseSuccess> => {
  const response = await api.post<ResponseSuccess>(`${API_URL}/admin/orders/updatePayment`, { id_order, data });
  return response.data;
};

// Kado Cinta Orders
export const getKadoCintaOrders = async (page: number = 1, perPage: number = 10, status?: string, search?: string): Promise<OrderResponse> => {
  const params: Record<string, string | number> = { page, per_page: perPage };
  if (status && status !== 'Semua') params.status = status;
  if (search) params.search = search;
  const response = await api.get<OrderResponse>(`${API_URL}/admin/kado-cinta`, {
    params,
  });
  return response.data;
};

export const updateKadoCintaResi = async (id_order: number, resi: string): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/kado-cinta/updateResi`, { id_order, resi });
  return response.data;
};

export const markKadoCintaAsDelivered = async (id_order: number): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/kado-cinta/markDelivered`, { id_order });
  return response.data;
};

export const updateKadoCintaPayment = async (id_order: number, data: string): Promise<ResponseSuccess> => {
  const response = await api.post<ResponseSuccess>(`${API_URL}/admin/kado-cinta/updatePayment`, { id_order, data });
  return response.data;
};

// Catgory Kado Cinta
export const getCategoryKadoCinta = async (): Promise<KadoCintaCategoryResponse> => {
  const response = await api.get<KadoCintaCategoryResponse>(`${API_URL}/admin/kado-cinta-categories`);
  return response.data;
};

export const createCategoryKadoCinta = async (name: string): Promise<ResponseSuccess> => {
  const response = await api.post<ResponseSuccess>(`${API_URL}/admin/kado-cinta-categories`, { name });
  return response.data;
};

export const updateCategoryKadoCinta = async (id: number, name: string): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/kado-cinta-categories`, { id, name });
  return response.data;
};

export const releaseCategoryKadoCinta = async (id: number): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/kado-cinta-categories/release`, { id });
  return response.data;
};

export const deleteCategoryKadoCinta = async (id: number): Promise<ResponseSuccess> => {
  const response = await api.put<ResponseSuccess>(`${API_URL}/admin/kado-cinta-categories/delete`, { id });
  return response.data;
};

// Kado Cinta
export const getListUsers = async (search: string): Promise<ResponseListUser> => {
  const response = await api.get<ResponseListUser>(`${API_URL}/admin/kado-cinta/list-user`, { params: { search } });
  return response.data;
};

export const getKadoCinta = async (user_id: number): Promise<{ data: KadoCinta[]; message: string }> => {
  const response = await api.get<{ data: KadoCinta[]; message: string }>(`${API_URL}/admin/kado-cinta/`, { params: { user_id } });
  return response.data;
};

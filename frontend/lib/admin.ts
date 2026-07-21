import { api, loginUser } from './api';

export interface AdminLoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface CreatePropertyPayload {
  title: string;
  slug: string;
  description: string;
  type: string;
  purpose: string;
  price: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  suites?: number;
  parkingSpaces?: number;
  area?: number;
  address: string;
  city: string;
  district?: string;
  province?: string;
  status?: string;
}

export type UpdatePropertyPayload = Partial<CreatePropertyPayload>;

export async function loginAdmin(email: string, password: string): Promise<AdminLoginResponse> {
  return loginUser(email, password);
}

export function setAdminToken(token: string) {
  localStorage.setItem('admin_token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function getAdminToken() {
  return localStorage.getItem('admin_token');
}

export function clearAdminToken() {
  localStorage.removeItem('admin_token');
  delete api.defaults.headers.common['Authorization'];
}

export async function createProperty(data: CreatePropertyPayload) {
  const response = await api.post('/properties', data);
  return response.data;
}

export async function updateProperty(id: string, data: UpdatePropertyPayload) {
  const response = await api.patch(`/properties/${id}`, data);
  return response.data;
}

export async function approveProperty(id: string) {
  const response = await api.patch(`/properties/${id}/approve`);
  return response.data;
}

export async function rejectProperty(id: string) {
  const response = await api.patch(`/properties/${id}/reject`);
  return response.data;
}

export async function deleteProperty(id: string) {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
}

export async function getAllProperties() {
  const response = await api.get('/properties/admin/all');
  return response.data;
}

export async function addPropertyImage(
  propertyId: string,
  data: { url: string; altText?: string; isCover?: boolean; sortOrder?: number }
) {
  const response = await api.post(`/properties/${propertyId}/images`, data);
  return response.data;
}

export async function updatePropertyImage(
  propertyId: string,
  imageId: string,
  data: { url?: string; altText?: string; isCover?: boolean; sortOrder?: number }
) {
  const response = await api.patch(`/properties/${propertyId}/images/${imageId}`, data);
  return response.data;
}

export async function deletePropertyImage(propertyId: string, imageId: string) {
  const response = await api.delete(`/properties/${propertyId}/images/${imageId}`);
  return response.data;
}

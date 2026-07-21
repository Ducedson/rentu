import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.rentu.co.mz/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});


export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}


export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}


interface BackendAuthResponse {
  accessToken: string;
  user: AuthUser;
}


export interface PropertyImage {
  id: string;
  url: string;
  altText?: string;
  isCover: boolean;
  sortOrder: number;
}


export interface PropertyOwner {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;

  type: string;
  purpose: string;
  status: string;

  price: number;
  currency: string;

  bedrooms?: number;
  bathrooms?: number;
  suites?: number;
  parkingSpaces?: number;

  area?: number;
  lotArea?: number;

  furnished: boolean;
  featured: boolean;

  address: string;
  country: string;
  province?: string;
  city: string;
  district?: string;

  latitude?: number;
  longitude?: number;

  availableFrom?: string;
  publishedAt?: string;

  createdAt: string;
  updatedAt: string;

  images: PropertyImage[];

  owner: PropertyOwner;
}


export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {

  const response =
    await api.post<BackendAuthResponse>(
      "/auth/login",
      { email, password }
    );

  return {
    access_token: response.data.accessToken,
    user: response.data.user,
  };
}



export async function registerUser(
  data: {
    name:string;
    email:string;
    password:string;
    phone?:string;
    role?:string;
  }
): Promise<AuthResponse> {

  const response =
    await api.post<BackendAuthResponse>(
      "/auth/register",
      data
    );

  return {
    access_token: response.data.accessToken,
    user: response.data.user,
  };
}



export async function getProperties(
  filters?: {
    city?:string;
    type?:string;
    purpose?:string;
    q?:string;
  }
): Promise<Property[]> {

  const response =
    await api.get("/properties", {
      params: filters
    });

  return response.data;
}



export async function getProperty(
  id:string
):Promise<Property>{

  const response =
    await api.get(`/properties/${id}`);

  return response.data;
}



export async function getMyProperties()
:Promise<Property[]>{

  const response =
    await api.get("/properties/me/list");

  return response.data;
}



export function getApiErrorMessage(
 error:unknown,
 fallback:string
){

 if(!axios.isAxiosError(error)){
   return fallback;
 }

 const message =
   error.response?.data?.message;


 if(Array.isArray(message)){
   return message.join(", ");
 }

 return typeof message === "string"
 ? message
 : fallback;

}

import { Review } from "@/lib/mockData";

export type { Review };


export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}


export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CheckoutRequest {
  items: CartItem[];
  shipping_address: string;
  email: string;
}

export interface CheckoutResponse {
  order_id: string;
  total: number;
  status: string;
  message: string;
}

export interface ApiErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiError {
  detail: ApiErrorDetail[];
}


export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}


export type Category = string;

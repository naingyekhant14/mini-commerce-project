import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}
export interface CartType {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
}
export interface CreateOrderOption extends BaseOptions {
  payload: CartItem[];
}

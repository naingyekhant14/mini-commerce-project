import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}
export interface CartType {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
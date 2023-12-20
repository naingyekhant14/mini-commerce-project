import { Product } from "@prisma/client";

export interface ProductSlice {
  items: Product[];
  isLoading: boolean;
  error: boolean | null;
}

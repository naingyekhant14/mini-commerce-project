import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductSlice } from "../../types/product";
import { config } from "../../utils/config";
const initialState: ProductSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const fatchProducts = createAsyncThunk(
  "product.fetchProducts",
  async (_, thunkAPI) => {
    const response = await fetch(`${config.apiBaseUrl}/products`);
    const products = await response.json();
    thunkAPI.dispatch(setProduct(products));
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;

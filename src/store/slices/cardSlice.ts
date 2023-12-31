import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CancleOrderOption,
  CartType,
  CreateOrderOption,
} from "../../types/cart";
import { config } from "../../utils/config";

const initialState: CartType = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (options: CreateOrderOption, thunkApi) => {
    const { payload, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      onSuccess && onSuccess(dataFromServer);
    } catch (error) {
      onError && onError(error);
    }
  }
);

export const cancleOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (options: CancleOrderOption, thunkApi) => {
    const { orderId, onSuccess, onError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      if (quantity) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;

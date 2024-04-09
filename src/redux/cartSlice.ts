import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  const initialState: { cartItems: CartItem[] } = {
    cartItems: [],
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const { id, name, price, image } = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push({ id, name, price, quantity: 1, image: image});
        }
      },
      removeFromCart: (state, action) => {
        const { id } = action.payload;
        const index = state.cartItems.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.cartItems.splice(index, 1);
        }
      },
      increaseQuantity: (state, action) => {
        const { id } = action.payload;
        const item = state.cartItems.find((item) => item.id === id);
        if (item) {
          item.quantity += 1;
        }
      },
      decreaseQuantity: (state, action) => {
        const { id } = action.payload;
        const item = state.cartItems.find((item) => item.id === id);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },
    },
  });
  
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
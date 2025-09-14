import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.cart.find(
        (item) => item.itemId === action.payload.itemId,
      );
      console.log(existingItem);
      if (existingItem) {
        const item = state.cart.find(
          (item) => item.itemId === action.payload.itemId,
        );
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      } else state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.itemId !== action.payload);
    },
    increaseItem(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const getCartTotalQunatity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCart = (state) => state.cart.cart;

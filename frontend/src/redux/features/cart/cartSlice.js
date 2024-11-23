import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((product) => product._id === action.payload._id);
      if (!isExist) {
        // Add product with quantity set to 1 if not found in cart
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        // If the product exists, just increase quantity
        isExist.quantity += 1;
      }

      // Recalculate cart details after adding item
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    updateQuantity: (state, action) => {
      const product = state.products.find((product) => product._id === action.payload._id);
      if (product) {
        if (action.payload.type === 'increment') {
          product.quantity += 1;
        } else if (action.payload.type === 'decrement' && product.quantity > 1) {
          product.quantity -= 1;
        }
      }

      // Recalculate cart details after quantity update
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload._id);

      // Recalculate cart details after item removal
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.taxRate = 0.05;
      state.grandTotal = 0;
    },
  },
});

export const setSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) =>
  state.products.reduce((total, product) => total + product.quantity * product.price, 0);

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

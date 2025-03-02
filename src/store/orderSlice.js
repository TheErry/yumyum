import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tenant: "",
  cart: [],
  orderStatus: "idle", // idle | loading | success | error
  orderId: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTenant: (state, action) => {
      state.tenant = action.payload;
    },
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
      state.orderStatus = "idle";
    },
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload; 
    },
    setEta: (state, action) => {
      state.eta = action.payload;
    },
  },
});

export const {
  setTenant,
  addItem,
  removeItem,
  clearCart,
  setOrderStatus,
  setOrderId,
  setEta,
} = orderSlice.actions;
export default orderSlice.reducer;

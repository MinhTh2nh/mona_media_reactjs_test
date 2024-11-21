import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerInfo: {
    name: "",
    email: "",
    phoneNumber: "",
  },
  cart: [],
  orderHistory: [],
  paymentMethod: null,
  total: 0,
  cashReceived: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    addProductToCart: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 });
    },
    updateCartItem: (state, action) => {
      const { index, field, value } = action.payload;
      state.cart[index][field] = value;
    },
    removeCartItem: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setCashReceived: (state, action) => {
      state.cashReceived = action.payload;
    },
    setTotalOrder: (state, action) => {
      state.total = action.payload;
    },
    confirmOrder: (state) => {
      const order = {
        customerInfo: state.customerInfo,
        cart: state.cart,
        total: state.total,
        paymentMethod: state.paymentMethod,
        date: new Date().toISOString(),
      };
      console.log(
        "Order  confirmation:", order
      );
      state.orderHistory.push(order);
      state.cart = [];
      state.customerInfo = { name: "", email: "", phoneNumber: "" };
      state.paymentMethod = null;
      state.total = 0;
      state.cashReceived = 0;
    },
  },
});

export const {
  updateCustomerInfo,
  addProductToCart,
  updateCartItem,
  removeCartItem,
  setPaymentMethod,
  setTotalOrder,
  setCashReceived,
  confirmOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

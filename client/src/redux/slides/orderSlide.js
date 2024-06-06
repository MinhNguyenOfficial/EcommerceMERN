import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  checkedItems: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
};

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { orderItem } = action.payload;
      const itemAdded = state.orderItems.find(
        (item) => item.id === orderItem.id
      );
      if (itemAdded) {
        itemAdded.amount += orderItem.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },

    changeProductQuantity: (state, action) => {
      const { orderItem } = action.payload;
      const itemAdded = state.orderItems.find(
        (item) => item.id === orderItem.id
      );
      itemAdded.amount = orderItem.amount;
    },

    deleteProductFromCart: (state, action) => {
      const removeList = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => !removeList.includes(item.id)
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeProductQuantity,
  deleteProductFromCart,
} = orderSlide.actions;

export default orderSlide.reducer;

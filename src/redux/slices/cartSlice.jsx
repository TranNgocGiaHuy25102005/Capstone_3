import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartList: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemClick = action.payload;
      const itemIndex = state.cartList.findIndex(item => item.id === itemClick.id);
      if (itemIndex !== -1) {
        state.cartList[itemIndex].quantityCart += 1;
      } else {
        state.cartList.push({ ...itemClick, quantityCart: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartList.find(item => item.id === id);
      if (item) {
        item.quantityCart += quantity;
        if (item.quantityCart < 1) item.quantityCart = 1;
      }
    },
    removeItem: (state, action) => {
      state.cartList = state.cartList.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartList = []; 
    }
  }
});

export const { addToCart, changeQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
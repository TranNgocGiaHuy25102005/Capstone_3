import axios from "axios";
import { create } from "zustand";
import api from './../api/axios';

const useCartStore = create((set, get) => ({
  cartItems: [],
  cartCount: 0,
  addCartItem: (obj, quantity) => {
    set((state) => {
      const isExisting = state.cartItems.some(
        (cartItem) => cartItem.item.id === obj.id,
      );

      if (isExisting) {
        return {
          cartItems: state.cartItems.map((cartItem) => {
            if (cartItem.item.id === obj.id) {
              return { ...cartItem, quantity: cartItem.quantity + quantity };
            }
            return cartItem;
          }),
        };
      }
      return {
        cartItems: [...state.cartItems, { item: obj, quantity: quantity }],
        cartCount: state.cartCount + 1,
      };
    });
  },
  reduceCartItem: (obj) => {
    set((state) => {
      let isRemoved = false;

      const newCartItems = state.cartItems
        .map((cartItem) => {
          if (cartItem.item.id === obj.id) {
            const newQuantity = cartItem.quantity - 1;
            if (newQuantity === 0) {
              isRemoved = true;
              return null;
            }
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        })
        .filter(Boolean);

      return {
        cartItems: newCartItems,
        cartCount: isRemoved ? state.cartCount - 1 : state.cartCount,
      };
    });
  },
  removeCartItem: (obj) => {
    set((state) => {
      return {
        cartItems: state.cartItems
          .map((cartItem) => {
            if (cartItem.item.id === obj.id) {
              return null;
            }
            return cartItem;
          })
          .filter(Boolean),
        cartCount: state.cartCount - 1
      };
    });
  },
  submitOrder: async (email) => {
    const { cartItems } = get();
    
    const orderDetail = cartItems.map((cartItem) => {
      return {
        productId: String(cartItem.item.id),
        quantity: cartItem.quantity
      }
    });

    const payload = {
      orderDetail: orderDetail,
      email: email
    };

    try {
      const res = await api.post("/Users/order", payload);
      set({
        cartItems: [],
        cartCount: 0
      });
    } catch (error) {
      console.error("Lỗi khi submit order:", error);
    }
  }
}));

export default useCartStore;
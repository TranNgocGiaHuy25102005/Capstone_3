import { create } from "zustand";
import api from "./../api/axios";

export const useAuth = create((set, get) => {
  return {
    userInfor: null,
    isCheckingAuth: true,
    orders: [],
    setUserInfor: async () => {
      try {
        const res = await api.post("/Users/getProfile");
        set({
          userInfor: res.data.content,
          isCheckingAuth: false,
        });
      } catch (err) {
        set((state) => {
          return {
            userInfor: null,
            isCheckingAuth: false,
          };
        });
      }
    },
    updateUserinfor: async (updateData) => {
      try {
        const {setUserInfor} = get()
        const res = await api.post("/Users/updateProfile", updateData);
        setUserInfor()
      } catch (err) {
        console.log(err)
      }
    },
    getOrders: async() => {
        try {
            const res = await api.post("Users/getProfileV2");
            set({
                orders: res.data.content.ordersHistory
            })
        } catch (err) {
            console.log(err)
        }
    },
    logout: () => {
      localStorage.removeItem("accessToken");
      set({
        userInfor: null,
        isCheckingAuth: false,
      });
      window.location.href("/");
    },
  };
});

import { create } from "zustand";
import api from "./../api/axios";

export const useAuth = create((set, get) => {
  return {
    userInfor: null,
    isCheckingAuth: true,
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
        throw err;
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

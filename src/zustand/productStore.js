import { create } from "zustand";
import api from './../api/axios';

const useProductStore = create((set, get) => ({
  products: [],
  keywords: "",

  getProducts: async () => {
    try {
      const { keywords } = get();
      const response = await api.get("/Product", {
        params: keywords ? { keyword: keywords } : {},
      });
      set({
        products: response.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  },
  setKeyword: (keywords) => {
    set({ keywords });
  }
}));

export default useProductStore;

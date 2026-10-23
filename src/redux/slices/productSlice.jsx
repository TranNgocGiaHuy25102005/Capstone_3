import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductAction = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await axios.get('https://shop.cyberlearn.vn/api/Product');
    return response.data.content;
  }
);

export const fetchProductDetailAction = createAsyncThunk(
  'product/fetchProductDetail',
  async (id) => {
    const response = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`);
    return response.data.content;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    listProduct: [],
    productDetail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.listProduct = action.payload;
    });
    builder.addCase(fetchProductDetailAction.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  },
});

export default productSlice.reducer;
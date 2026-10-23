import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAction = createAsyncThunk(
  "user/login",
  async (userLogin, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://shop.cyberlearn.vn/api/Users/signin",
        userLogin,
      );

      localStorage.setItem("accessToken", response.data.content.accessToken);
      localStorage.setItem("userLogin", JSON.stringify(response.data.content));

      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  currentUser: localStorage.getItem("userLogin")
    ? JSON.parse(localStorage.getItem("userLogin"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const registerAction = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://shop.cyberlearn.vn/api/Users/signup",
        userInfo,
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export default userSlice.reducer;

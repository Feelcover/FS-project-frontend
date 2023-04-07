import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUser = createAsyncThunk("posts/fetchUser", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});
export const fetchUserMe = createAsyncThunk("posts/fetchUserMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});
export const fetchRegister = createAsyncThunk("posts/fetchRegister", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
    builder.addCase(fetchUserMe.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchUserMe.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchUserMe.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },

});

export const isAuthSelector = (state) => Boolean(state.authReducer.data);
export const {logout} = authSlice.actions;
export default authSlice.reducer;
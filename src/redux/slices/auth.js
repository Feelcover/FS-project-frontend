import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUser = createAsyncThunk("posts/fetchUser", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
  },
});

export default authSlice.reducer;
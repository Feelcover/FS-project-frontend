import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPostsByView = createAsyncThunk(
  "posts/fetchPostsByView",
  async () => {
    const { data } = await axios.get("/posts/most-view");
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    });
    builder.addCase(fetchPostsByView.pending, (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.status = "loading";
      state.tags.items = [];
    });
    builder.addCase(fetchDeletePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.meta.arg
      );
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = "success";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPostsByView.fulfilled, (state, action) => {
      state.posts.status = "success";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.status = "success";
      state.tags.items = action.payload;
    });

    builder.addCase(fetchPostsByView.rejected, (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    });
  },
});

export default postsSlice.reducer;

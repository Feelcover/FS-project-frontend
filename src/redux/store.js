import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/post"

const store = configureStore({
  reducer: {
    postsReducer: postsReducer,
  },
});

export default store;

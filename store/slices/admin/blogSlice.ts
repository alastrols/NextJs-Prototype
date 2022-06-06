import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BlogData } from "@/models/blog.model";
import * as adminService from "@/services/admin/adminService";
import { RootState, store } from "../../store";
import { NextRouter } from "next/router";

interface BlogState {
  blog: BlogData[];
}

const initialState: BlogState = {
  blog: [],
};

export const getBlog = createAsyncThunk(
  "blog/get",
  async (keyword?: string) => {
    return await adminService.getBlog(keyword);
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: string) => {
    await adminService.deleteBlog(id);
    store.dispatch(getBlog());
  }
);
export const deleteAllBlog = createAsyncThunk(
  "blog/deleteall",
  async (id: string) => {
    await adminService.deleteAllBlog(id);
    store.dispatch(getBlog());
  }
);

export const sortableBlog = createAsyncThunk(
  "blog/sortable",
  async (data: any) => {
    return await adminService.postBlogSortable(data);
  }
);

// export const editBanner = createAsyncThunk(
//   "banner/editBanner",
//   async (data: any) => {
//     return await adminService.editBanner(data);
//   }
// );

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
    });
  },
});

export const blogSelector = (store: RootState): BlogData[] | undefined =>
  store.blog.blog;
export default blogSlice.reducer;

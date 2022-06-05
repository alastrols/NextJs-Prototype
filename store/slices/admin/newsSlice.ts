import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { NewsData } from "@/models/news.model";
import * as adminService from "@/services/admin/adminService";
import { RootState, store } from "../../store";
import { NextRouter } from "next/router";

interface NewsState {
  news: NewsData[];
}

const initialState: NewsState = {
  news: [],
};

export const getNews = createAsyncThunk(
  "news/get",
  async (keyword?: string) => {
    return await adminService.getNews(keyword);
  }
);

export const deleteNews = createAsyncThunk(
  "news/delete",
  async (id: string) => {
    await adminService.deleteNews(id);
    store.dispatch(getNews());
  }
);
export const deleteAllNews = createAsyncThunk(
  "news/deleteall",
  async (id: string) => {
    await adminService.deleteAllNews(id);
    store.dispatch(getNews());
  }
);

export const sortableNews = createAsyncThunk(
  "news/sortable",
  async (data: any) => {
    return await adminService.postNewsSortable(data);
  }
);

// export const editBanner = createAsyncThunk(
//   "banner/editBanner",
//   async (data: any) => {
//     return await adminService.editBanner(data);
//   }
// );

const newsSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});

export const newsSelector = (store: RootState): NewsData[] | undefined =>
  store.news.news;
export default newsSlice.reducer;

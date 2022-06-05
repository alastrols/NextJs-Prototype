import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BannerData } from "@/models/banner.model";
import * as adminService from "@/services/admin/adminService";
import { RootState, store } from "../../store";
import { NextRouter } from "next/router";

interface BannerState {
  banners: BannerData[];
}

const initialState: BannerState = {
  banners: [],
};

export const getBanner = createAsyncThunk(
  "banner/get",
  async (keyword?: string) => {
    return await adminService.getBanners(keyword);
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/delete",
  async (id: string) => {
    await adminService.deleteBanner(id);
    store.dispatch(getBanner());
  }
);
export const deleteAllBanner = createAsyncThunk(
  "banner/deleteall",
  async (id: string) => {
    await adminService.deleteAllBanner(id);
    store.dispatch(getBanner());
  }
);

export const sortableBanner = createAsyncThunk(
  "banner/sortable",
  async (data: any) => {
    return await adminService.postBannerSortable(data);
  }
);

export const editBanner = createAsyncThunk(
  "banner/editBanner",
  async (data: any) => {
    return await adminService.editBanner(data);
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.banners = action.payload;
    });
  },
});

export const bannerSelector = (store: RootState): BannerData[] | undefined =>
  store.banner.banners;
export default bannerSlice.reducer;

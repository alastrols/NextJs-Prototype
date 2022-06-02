import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import adminReducer from "./slices/admin/adminSlice";
import bannerReducer from "./slices/admin/bannerSlice";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
const reducers = {
  user: userReducer,
  product: productReducer,
  admin: adminReducer,
  banner: bannerReducer,
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

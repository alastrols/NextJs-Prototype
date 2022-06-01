import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@/models/user.model";
import { RootState } from "@/store/store";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import * as adminService from "@/services/admin/adminService";
import httpClientAdmin from "@/utils/httpClient";
import { AxiosRequestConfig } from "axios";
import Router from "next/router";

interface UserState {
  username: string;
  accessToken: string;
  error?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: UserData;
}

const initialState: UserState = {
  username: "",
  accessToken: "",
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
};

interface SingleProps {
  data: string;
}

interface SignInAction {
  username: string;
  password: string;
}
interface SignUpAction {
  fullname: string;
  username: string;
  password: string;
}

export const register = createAsyncThunk(
  "/register",
  async (credential: SignUpAction) => {
    const response = await adminService.register(credential);
    return response;
  }
);

export const login = createAsyncThunk(
  "/login",
  async (credential: SignInAction) => {
    const response = await adminService.login(credential);
    if (response.status != "success") {
      throw new Error("login failed");
    }

    // set access token
    httpClientAdmin.interceptors.request.use((config?: AxiosRequestConfig) => {
      if (config && config.headers) {
        config.headers["AdminAuthorization"] = `Bearer ${response.data.token}`;
      }

      return config;
    });
    return response;
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await adminService.logout();
  Router.push("/admin/login");
});

export const getAdminSession = createAsyncThunk(
  "/getadminsession",
  async () => {
    const response = await adminService.getSession();

    // set access token
    if (response) {
      httpClientAdmin.interceptors.request.use(
        (config?: AxiosRequestConfig) => {
          if (config && config.headers && response.user) {
            config.headers[
              "admin-access-token"
            ] = `Bearer ${response.user?.token}`;
          }
          return config;
        }
      );
    }
    return response;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    resetUsername: (state, action: PayloadAction<SingleProps>) => {
      state.username = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.username = "";
      state.accessToken = "";
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.username = action.payload.data.username;
      state.accessToken = action.payload.data.token;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.user = action.payload.data;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.username = "";
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.user = undefined;
    });
    builder.addCase(logout.fulfilled, (state, action: any) => {
      state.username = "";
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.user = undefined;
    });
    builder.addCase(getAdminSession.fulfilled, (state, action) => {
      state.isAuthenticating = false;

      if (action.payload && action.payload.data && action.payload.data.token) {
        state.accessToken = action.payload.data.token;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      }
    });
  },
});

export const { resetUsername } = adminSlice.actions;

export const adminSelector = (store: any) => store.admin;

export const isAuthenticatedSelector = (store: any) =>
  store.admin.isAuthenticated;
export const isAuthenticatingSelector = (store: any) =>
  store.admin.isAuthenticating;

export default adminSlice.reducer;

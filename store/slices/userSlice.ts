import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@/models/user.model";
import { RootState } from "@/store/store";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import * as serverService from "@/services/serverService";
import httpClient from "@/utils/httpClient";
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
  username: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "user/signup",
  async (credential: SignUpAction) => {
    const response = await serverService.signUp(credential);
    return response;
  }
);

export const signIn = createAsyncThunk(
  "user/signin",
  async (credential: SignInAction) => {
    const response = await serverService.signIn(credential);
    if (response.result != "ok") {
      throw new Error("login failed");
    }

    // set access token
    httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
      if (config && config.headers) {
        config.headers["Authorization"] = `Bearer ${response.token}`;
      }

      return config;
    });
    return response;
  }
);

export const signOut = createAsyncThunk("user/signout", async () => {
  await serverService.signOut();
  Router.push("/login");
});

export const getSession = createAsyncThunk("user/fetchSession", async () => {
  const response = await serverService.getSession();

  // set access token
  if (response) {
    httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
      if (config && config.headers && response.user) {
        config.headers["Authorization"] = `Bearer ${response.user?.token}`;
      }
      return config;
    });
  }
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUsername: (state, actions: PayloadAction<SingleProps>) => {
      state.username = actions.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.username = "";
      state.accessToken = "";
      state.isAuthenticated = false;
    });
    builder.addCase(signIn.fulfilled, (state, action: any) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.user = action.payload.user;
    });
    builder.addCase(signIn.rejected, (state, action: any) => {
      state.username = "";
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.user = undefined;
    });
    builder.addCase(signOut.fulfilled, (state, action: any) => {
      state.username = "";
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.user = undefined;
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      if (action.payload && action.payload.user && action.payload.user.token) {
        state.accessToken = action.payload.user.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    });
  },
});

export const { resetUsername } = userSlice.actions;

export const userSelector = (store: any) => store.user;
export const isAuthenticatedSelector = (store: any) =>
  store.user.isAuthenticated;
export const isAuthenticatingSelector = (store: any) =>
  store.user.isAuthenticating;

export default userSlice.reducer;

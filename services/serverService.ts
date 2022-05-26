import { SignUp, SignIn, GetSession } from "@/models/auth.model";
import { UserData } from "@/models/user.model";
import { ProductData } from "@/models/product.model";
import axios from "axios";
import httpClient from "@/utils/httpClient";

type signProps = {
  username: string;
  password: string;
};

// Promise = Return // SignUp คือ ค่า ของผลลัพท์
export const signUp = async (user: signProps): Promise<SignUp> => {
  const response = await httpClient.post<SignUp>("/authen/register", user);

  return response.data;
};

export const signIn = async (user: signProps): Promise<SignIn> => {
  const response = await httpClient.post<SignIn>("/auth/signin", user, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });

  return response.data;
};

export const signOut = async () => {
  const response = await httpClient.get("/auth/signout", {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
};

export const getSession = async (): Promise<GetSession> => {
  const response = await httpClient.get("/auth/session", {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
};

export const getProducts = async (keyword?: string): Promise<ProductData[]> => {
  if (keyword) {
    const response = await httpClient.get(`/stock/product/keyword/${keyword}`);
    return response.data;
  } else {
    const response = await httpClient.get(`/stock/product`);
    return response.data;
  }
};

export const deleteProduct = async (id?: string): Promise<void> => {
  await httpClient.delete(`/stock/product/${id}`);
};

export const deleteAllProduct = async (id: string): Promise<void> => {
  const total_id = id.length;
  for (var i = 0; i <= total_id; i++) {
    await httpClient.delete(`/stock/product/${id[i]}`);
  }
};
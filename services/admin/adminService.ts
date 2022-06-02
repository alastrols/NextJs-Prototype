import { SignUp, SignIn, GetSession } from "@/models/auth.model";
import { httpClientAdmin } from "@/utils/httpClient";
import { ADMIN_ACCESS_TOKEN_KEY } from "@/utils/constant";
import { BannerData } from "@/models/banner.model";
import axios, { AxiosRequestConfig } from "axios";

type signProps = {
  username: string;
  password: string;
};

type register = {
  fullname: string;
  username: string;
  password: string;
};

// Promise = Return // SignUp คือ ค่า ของผลลัพท์
export const register = async (user: register): Promise<SignUp> => {
  const response = await httpClientAdmin.post<SignUp>("/register", user);

  return response.data;
};

export const login = async (user: signProps): Promise<SignIn> => {
  const response = await httpClientAdmin.post<SignIn>(
    "/auth/adminLogin",
    user,
    {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    }
  );

  return response.data;
};

export const getSession = async (): Promise<GetSession> => {
  const response = await httpClientAdmin.get("/auth/adminsession", {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });

  return response.data;
};

export const logout = async () => {
  const response = await httpClientAdmin.get("/auth/adminSignout", {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
};

export const addBanner = async (data: FormData): Promise<any> => {
  const response = await httpClientAdmin.post<SignIn>(
    "/admin/banner/addBanner",
    data,
    {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    }
  );

  return response.data;
};

export const getBanners = async (keyword?: string): Promise<BannerData[]> => {
  if (keyword) {
    const response = await httpClientAdmin.get(
      `/admin/banner/get?keyword=${keyword}`,
      {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
      }
    );
    return response.data.data;
  } else {
    const response = await httpClientAdmin.get("/admin/banner/select", {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });
    return response.data.data;
  }
};

export const deleteBanner = async (id?: string): Promise<void> => {
  // await httpClientAdmin.delete(`/stock/product/${id}`);
  const response = await httpClientAdmin.delete(
    `/admin/banner/delete?id=${id}`,
    {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    }
  );
  return response.data.data;
};

export const deleteAllBanner = async (id: any): Promise<void> => {
  // await httpClientAdmin.delete(`/stock/product/${id}`);
  id.forEach(async (id: number) => {
    await httpClientAdmin.delete(`/admin/banner/delete?id=${id}`, {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });
  });
};

export const postSortable = async (data: any): Promise<void> => {
  const response = await httpClientAdmin.post(`/banner/sortable`, data);
  return response.data;
};

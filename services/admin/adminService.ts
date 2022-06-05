import { SignUp, SignIn, GetSession } from "@/models/auth.model";
import { httpClientAdmin } from "@/utils/httpClient";
import { ADMIN_ACCESS_TOKEN_KEY } from "@/utils/constant";
import { BannerData } from "@/models/banner.model";
import { NewsData } from "@/models/news.model";
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
  const url = process.env.NEXT_PUBLIC_BASE_URL_ADMIN_API;
  const response = await axios.post(`${url}/register`, user);

  return response.data;
};

export const login = async (user: signProps): Promise<SignIn> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.post<SignIn>(`${url}/auth/adminLogin`, user);

  return response.data;
};

export const getSession = async (): Promise<GetSession> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.get(`${url}/auth/adminsession`);

  return response.data;
};

export const logout = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.get(`${url}/auth/adminSignout`);
  return response.data;
};

export const addBanner = async (data: FormData): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.post<SignIn>(
    `${url}/admin/banner/addBanner`,
    data
  );

  return response.data;
};

export const getBanners = async (keyword?: string): Promise<BannerData[]> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  if (keyword) {
    const response = await axios.get(
      `${url}/admin/banner/get?keyword=${keyword}`
    );
    return response.data.data;
  } else {
    const response = await axios.get(`${url}/admin/banner/select`);
    return response.data.data;
  }
};

export const getBannerId = async (id: any): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  if (id) {
    const response = await axios.get(`${url}/admin/banner/getbyid?id=${id}`);
    return response.data.data[0];
  }
};

export const editBanner = async (data: FormData): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.post(`${url}/admin/banner/editBanner`, data);

  return response.data;
};

export const deleteBanner = async (id?: string): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  // await httpClientAdmin.delete(`/stock/product/${id}`);
  const response = await axios.delete(`${url}/admin/banner/delete?id=${id}`);
  return response.data.data;
};

export const deleteAllBanner = async (id: any): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  // await httpClientAdmin.delete(`/stock/product/${id}`);
  id.forEach(async (id: number) => {
    await axios.delete(`${url}/admin/banner/delete?id=${id}`);
  });
};

export const postBannerSortable = async (data: any): Promise<void> => {
  const response = await httpClientAdmin.post(`/banner/sortable`, data);
  return response.data;
};

export const getNews = async (keyword?: string): Promise<NewsData[]> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  if (keyword) {
    const response = await axios.get(
      `${url}/admin/news/get?keyword=${keyword}`
    );
    return response.data.data;
  } else {
    const response = await axios.get(`${url}/admin/news/select`);
    return response.data.data;
  }
};

export const deleteNews = async (id?: string): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  // await httpClientAdmin.delete(`/stock/product/${id}`);
  const response = await axios.delete(`${url}/admin/news/delete?id=${id}`);
  return response.data.data;
};

export const deleteAllNews = async (id: any): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  // await httpClientAdmin.delete(`/stock/product/${id}`);
  id.forEach(async (id: number) => {
    await axios.delete(`${url}/admin/news/delete?id=${id}`);
  });
};
export const postNewsSortable = async (data: any): Promise<void> => {
  const response = await httpClientAdmin.post(`/news/sortable`, data);
  return response.data;
};

export const addNews = async (data: FormData): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.post(`${url}/admin/news/addNews`, data);

  return response.data;
};

export const getNewsId = async (id: any): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  if (id) {
    const response = await axios.get(`${url}/admin/news/getbyid?id=${id}`);
    return response.data.data[0];
  }
};

export const editNews = async (data: FormData): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API;
  const response = await axios.post(`${url}/admin/news/editNews`, data);
  return response.data;
};

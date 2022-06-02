import { SignUp, SignIn, GetSession } from "@/models/auth.model";
import { httpClientAdmin } from "@/utils/httpClient";

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
  const response = await httpClientAdmin.post(`/banner/add`, data);
  return response.data;
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  ACCESS_TOKEN_KEY,
  ADMIN_ACCESS_TOKEN_KEY,
} from "@/utils/constant";
import { clearCookie, setCookie } from "@/utils/cookiesUtil";
import httpClient, { httpClientAdmin } from "@/utils/httpClient";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { AxiosRequestConfig } from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const action = req.query["nextAuth"][0];
  if (req.method === HTTP_METHOD_POST && action === "signin") {
    return signin(req, res);
  } else if (req.method === HTTP_METHOD_POST && action === "adminLogin") {
    return adminLogin(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "signout") {
    return signout(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "adminSignout") {
    return adminLogout(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "session") {
    return getSession(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "adminsession") {
    return getAdminSession(req, res);
  } else {
    return res
      .status(405)
      .end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
  }
}

async function signin(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await httpClient.post(`/authen/login`, req.body);

    const { token } = response.data;

    setCookie(res, ACCESS_TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(400).end();
  }
}

async function adminLogin(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await httpClientAdmin.post(`/login`, req.body);

    const token = response.data.data.token;

    setCookie(res, ADMIN_ACCESS_TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });

    res.json(response.data);
  } catch (error: any) {
    res.status(400).end();
  }
}

function signout(req: NextApiRequest, res: NextApiResponse<any>) {
  clearCookie(res, ACCESS_TOKEN_KEY);
  res.json({ result: "ok" });
}

async function getSession(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies[ACCESS_TOKEN_KEY];
    if (accessToken) {
      const response = await httpClient.get(`/authen/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      res.json(response.data);
    } else {
      res.json({ result: "nok" });
    }
  } catch (error: any) {
    res.json({ result: "nok" });
  }
}

async function getAdminSession(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

    if (accessToken) {
      const response = await httpClientAdmin.get(`/profile`, {
        headers: { "admin-access-token": `Bearer ${accessToken}` },
      });
      res.json(response.data);
    } else {
      res.json({ result: "error" });
    }
  } catch (error: any) {
    res.json({ result: "error" });
  }
}

function adminLogout(req: NextApiRequest, res: NextApiResponse<any>) {
  clearCookie(res, ADMIN_ACCESS_TOKEN_KEY);
  res.json({ result: "ok" });
}

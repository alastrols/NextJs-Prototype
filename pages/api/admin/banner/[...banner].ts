import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  HTTP_METHOD_DELETE,
  ACCESS_TOKEN_KEY,
  ADMIN_ACCESS_TOKEN_KEY,
} from "@/utils/constant";
import { clearCookie, setCookie } from "@/utils/cookiesUtil";
import httpClient, { httpClientAdmin } from "@/utils/httpClient";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const action = req.query["banner"][0];
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

  if (req.method === HTTP_METHOD_GET && action === "select") {
    return getBanner(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "get") {
    return getBannerSearch(req, res);
  } else if (req.method === HTTP_METHOD_POST && action === "addBanner") {
    return addBanner(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "getbyid") {
    return getById(req, res);
  } else if (req.method === HTTP_METHOD_POST && action === "editBanner") {
    return editBanner(req, res);
  } else if (req.method === HTTP_METHOD_DELETE && action === "delete") {
    return deleteBanner(req, res);
  }
}

async function addBanner(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

  let form = new formidable.IncomingForm();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      resolve({ err, fields, files });
    });
  });
  const response = await httpClientAdmin.post(`/banner/add`, data, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });
  return res.status(200).json({ status: response.data.status });
}

async function getBanner(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const response = await httpClientAdmin.get(`/banner`, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });

  return res
    .status(200)
    .json({ status: response.data.status, data: response.data.data });
}

async function getBannerSearch(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const { keyword } = req.query;
  const response = await httpClientAdmin.get(
    `/banner/search?keyword=${keyword}`,
    {
      headers: { admin_access_token: `Bearer ${accessToken}` },
    }
  );

  return res
    .status(200)
    .json({ status: response.data.status, data: response.data.data });
}

async function getById(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const { id } = req.query;
  const response = await httpClientAdmin.get(`/banner/getbyid?id=${id}`, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });
  return res
    .status(200)
    .json({ status: response.data.status, data: response.data.data });
}

async function editBanner(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

  let form = new formidable.IncomingForm();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      resolve({ err, fields, files });
    });
  });
  const response = await httpClientAdmin.post(`/banner/edit`, data, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });
  return res.status(200).json({ status: response.data.status });
}

async function deleteBanner(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const { id } = req.query;
  const response = await httpClientAdmin.delete(`/banner/delete?id=${id}`, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });

  return res.status(200).json({ status: response.data.status });
}

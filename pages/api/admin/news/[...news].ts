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
  const action = req.query["news"][0];
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

  if (req.method === HTTP_METHOD_GET && action === "select") {
    return getNews(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "get") {
    return getNewsSearch(req, res);
  } else if (req.method === HTTP_METHOD_DELETE && action === "delete") {
    return deleteNews(req, res);
  } else if (req.method === HTTP_METHOD_POST && action === "addNews") {
    return addNews(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "getbyid") {
    return getById(req, res);
  } else if (req.method === HTTP_METHOD_POST && action === "editNews") {
    return editNews(req, res);
  }
}

async function addNews(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

  let form = new formidable.IncomingForm();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      resolve({ err, fields, files });
    });
  });
  const response = await httpClientAdmin.post(`/news/add`, data, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });
  return res.status(200).json({ status: response.data.status });
}

async function getNews(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const response = await httpClientAdmin.get(`/news`, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });

  return res
    .status(200)
    .json({ status: response.data.status, data: response.data.data });
}

async function getNewsSearch(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const { keyword } = req.query;
  const response = await httpClientAdmin.get(
    `/news/search?keyword=${keyword}`,
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
  const response = await httpClientAdmin.get(`/news/getbyid?id=${id}`, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });
  return res
    .status(200)
    .json({ status: response.data.status, data: response.data.data });
}

async function editNews(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];

  let form = new formidable.IncomingForm();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      resolve({ err, fields, files });
    });
  });
  const response = await httpClientAdmin.post(`/news/edit`, data, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });
  return res.status(200).json({ status: response.data.status });
}

async function deleteNews(req: NextApiRequest, res: NextApiResponse<any>) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies[ADMIN_ACCESS_TOKEN_KEY];
  const { id } = req.query;
  const response = await httpClientAdmin.delete(`/news/delete?id=${id}`, {
    headers: { admin_access_token: `Bearer ${accessToken}` },
  });

  return res.status(200).json({ status: response.data.status });
}

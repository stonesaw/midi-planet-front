import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { BASE_URL } from "@/constants/site";
import { prisma } from "@/libs/prisma";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

export type IProjectIndexOutput = User[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProjectIndexOutput>
) {
  if (req.method !== "GET") return responseException(res, 405);
  const users = await prisma.user.findMany();

  responseSuccess(res, users);
}

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/api/user`);
  if (!res.ok) return null;
  const data: IProjectIndexOutput = await res.json();
  return data;
};

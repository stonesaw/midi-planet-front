import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { BASE_URL } from "@/constants/site";
import { prisma } from "@/libs/prisma";
import { responseSuccess } from "@/server/response/exception";

export type IProjectIndexResponse = User[];

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IProjectIndexResponse>
) {
  const users = await prisma.user.findMany();

  responseSuccess(res, users);
}

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/api/user`);
  if (!res.ok) return null;
  const data: IProjectIndexResponse = await res.json();
  return data;
};

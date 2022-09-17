import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { BASE_URL } from "@/constants/site";
import { prisma } from "@/libs/prisma";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

export type IUserShowResponse = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserShowResponse>
) {
  if (req.method !== "GET") return responseException(res, 405);
  const userId = req.query.id as string;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return responseException(res, 404);

  responseSuccess(res, user);
}

export const fetchUserById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/user/${id}/show`);
  if (!res.ok) return null;
  const data: IUserShowResponse = await res.json();
  return data;
};

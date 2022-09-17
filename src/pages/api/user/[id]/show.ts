import { Project, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { BASE_URL } from "@/constants/site";
import { prisma } from "@/libs/prisma";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";
import { DateToString } from "@/types/utils/date";

export type IUserShowOutput = User & {
  projects: DateToString<
    Project & {
      owner: User;
    }
  >[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserShowOutput>
) {
  if (req.method !== "GET") return responseException(res, 405);
  const userId = req.query.id as string;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      projects: {
        include: {
          owner: true,
        },
      },
    },
  });

  if (!user) return responseException(res, 404);

  const formattedUser: IUserShowOutput = {
    ...user,
    projects: user.projects.map((project) => ({
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    })),
  };
  responseSuccess(res, formattedUser);
}

export const fetchUserById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/user/${id}/show`);
  if (!res.ok) return null;
  const data: IUserShowOutput = await res.json();
  return data;
};

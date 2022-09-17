import { Project, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { BASE_URL } from "@/constants/site";
import { prisma } from "@/libs/prisma";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";
import { DateToString } from "@/types/utils/date";

export type IProjectIndexOutput = (DateToString<Project> & {
  owner: User;
})[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProjectIndexOutput>
) {
  if (req.method !== "GET") return responseException(res, 405);

  const projects = await prisma.project.findMany({
    include: {
      owner: true,
    },
  });

  const formattedProjects: IProjectIndexOutput = projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }));

  responseSuccess(res, formattedProjects);
}

export const fetchProjects = async () => {
  const res = await fetch(`${BASE_URL}/api/project`);
  if (!res.ok) return null;
  const data: IProjectIndexOutput = await res.json();
  return data;
};

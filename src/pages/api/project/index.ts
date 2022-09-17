import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "@/libs/prisma";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IProjectIndexResponse>
) {
  const session = await getSession();
  if (!session) return responseException(res, 401);
  if (!session.user) return responseException(res, 401);

  const projects = await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
    },
  });

  responseSuccess(res, projects);
}

export type IProjectIndexResponse = Project[];

import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { prisma } from "@/libs/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProjectShowOutput>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return responseException(res, 401);
  if (!session.user) return responseException(res, 401);

  const projectId = req.query.id as string;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) return responseException(res, 404);
  if (project.ownerId !== session.user.id) return responseException(res, 403);

  responseSuccess(res, project);
}

export type IProjectShowOutput = Project;

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
  res: NextApiResponse<IProjectIndexOutput>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return responseException(res, 401);
  if (!session.user) return responseException(res, 401);

  const projects = await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
    },
  });

  responseSuccess(res, projects);
}

export type IProjectIndexOutput = Project[];

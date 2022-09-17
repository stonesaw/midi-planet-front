import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import * as z from "zod";

import { prisma } from "@/libs/prisma";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectCreateResponse>
) {
  if (req.method !== "POST") return responseException(res, 400);

  const input = ProjectCreateInput.safeParse(req.body);
  if (!input.success) return responseException(res, 400);

  const session = await getSession();
  if (!session) return responseException(res, 401);
  if (!session.user) return responseException(res, 401);

  const project = await prisma.project.create({
    data: {
      title: input.data.title,
      ownerId: session.user.id,
    },
  });

  responseSuccess(res, project);
}

const ProjectCreateInput = z.object({
  title: z.string(),
});

export type IProjectCreateInput = z.infer<typeof ProjectCreateInput>;
export type ProjectCreateResponse = Project;

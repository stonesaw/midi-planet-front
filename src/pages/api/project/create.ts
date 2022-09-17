import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import * as z from "zod";

import { prisma } from "@/libs/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

const createProjectSchema = z.object({
  title: z.string().min(1).max(50),
});

export type IProjectCreateInput = z.infer<typeof createProjectSchema>;
export type IProjectCreateOutput = Project;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProjectCreateOutput>
) {
  if (req.method !== "POST") return responseException(res, 400);

  const input = createProjectSchema.safeParse(req.body);
  if (!input.success) return responseException(res, 400);

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return responseException(res, 401);
  if (!session.user) return responseException(res, 401);

  const project = await prisma.project.create({
    data: {
      title: input.data.title,
      owner: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  responseSuccess(res, project);
}

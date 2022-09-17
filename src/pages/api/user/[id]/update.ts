import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import * as z from "zod";

import { prisma } from "@/libs/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  responseException,
  responseSuccess,
} from "@/server/response/exception";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  twitter: z.string(),
  instagram: z.string(),
  github: z.string(),
});

export type IUserPutInput = z.infer<typeof schema>;
export type IUserPutOutput = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserPutOutput>
) {
  if (req.method !== "PUT") return responseException(res, 405);

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return responseException(res, 401);
  if (!session.user) return responseException(res, 401);

  const input = schema.partial().safeParse(req.body);
  if (!input.success) return responseException(res, 400);

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.data.name,
      description: input.data.description,
      twitter: input.data.twitter,
      instagram: input.data.instagram,
      github: input.data.github,
    },
  });

  responseSuccess(res, user);
}

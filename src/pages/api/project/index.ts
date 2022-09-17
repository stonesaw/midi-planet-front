import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const projects = prisma.project.findMany();
  res.json(projects);
}

import { NextApiResponse } from "next";

const STATUS = {
  200: "OK",
  400: "NOT FOUND",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT FOUND",
  405: "METHOD NOT ALLOWED",
} as const;

export const responseException = (
  res: NextApiResponse,
  exception: keyof Omit<typeof STATUS, 200>
) => res.status(Number(exception)).send(STATUS[exception]);

export const responseSuccess = <T>(res: NextApiResponse<T>, data: T) =>
  res.status(200).json(data);

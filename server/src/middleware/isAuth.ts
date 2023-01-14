import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "../Types/Context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const paylaod = verify(token, process.env.ACCESSTOKEN_SECRET!);
    context.payload = paylaod as { userId: string };
  } catch (err) {
    throw new Error("Not authenticated!!");
  }

  return next();
};

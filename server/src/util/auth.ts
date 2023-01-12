import { sign } from "jsonwebtoken";
import { IAuthUser } from "src/models/authUsers";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "../Types/Context";

export const createAccessToken = (user: IAuthUser) => {
  return sign(
    { userId: user.id, email: user.email },
    process.env.ACCESSTOKEN_SECRET!,
    { expiresIn: "10m" }
  );
};

export const createRefreshToken = (user: IAuthUser) => {
  return sign({ userId: user.id }, process.env.REFRESHTOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const paylaod = verify(token, process.env.ACCESSTOKEN_SECRET!);
    context.payload = paylaod as { userId: string };
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated!!");
  }

  return next();
};

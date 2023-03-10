import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("awsj", token, {
    httpOnly: true,
    path: "/token_refresh",
  });
};

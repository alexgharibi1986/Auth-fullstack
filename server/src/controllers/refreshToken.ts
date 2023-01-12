import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createAccessToken } from "../util/auth";
import AuthUsers from "../models/authUsers";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.awsj;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload = null;
  try {
    payload = verify(token, process.env.REFRESHTOKEN_SECRET!) as {
      userId: string;
    };
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // refresh token is valid and we can send back access token

  const user = await AuthUsers.findById(payload.userId);

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};

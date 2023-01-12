import { sign } from "jsonwebtoken";
import { IAuthUser } from "src/models/authUsers";

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

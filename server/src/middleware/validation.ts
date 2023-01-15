import { MiddlewareFn } from "type-graphql";
import { Context } from "../Types/Context";
import validator from "validator";

export const validation: MiddlewareFn<Context> = ({ context }, next) => {
  const email = context.req.body.variables.email;
  const password = context.req.body.variables.password;

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email address");
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
      password
    )
  ) {
    throw new Error("Invalid Password");
  }

  return next();
};

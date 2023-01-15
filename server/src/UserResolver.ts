import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import AuthUsers from "./models/authUsers";
import { hash, compare } from "bcryptjs";
import { LoginResponse, Users } from "./Types/Users";
import { Context } from "./Types/Context";
import { isAuth } from "./middleware/isAuth";
import { createRefreshToken, createAccessToken } from "./util/auth";
import { sendRefreshToken } from "./util/sendRefreshToken";
import { validation } from "./middleware/validation";

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  authUser(@Ctx() { payload }: Context) {
    return `Auth routes test, userId: ${payload!.userId}`;
  }

  @Query(() => [Users])
  async users() {
    const users = await AuthUsers.find();
    if (!users) {
      throw new Error("No users, Please sign up ");
    }
    return users;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(validation)
  async signin(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const hashedPassword = await hash(password, 12);

      const authUsers = new AuthUsers({
        email: email,
        password: hashedPassword,
      });

      await authUsers.save();
    } catch (err) {
      console.log(err);

      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  @UseMiddleware(validation)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await AuthUsers.findOne({
      email: email,
    });

    if (!user) {
      throw new Error("Invalid Login");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    //login successfully

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
  }
}

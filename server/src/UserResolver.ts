import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import AuthUsers, { IAuthUser } from "./models/authUsers";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { LoginResponse, Users } from "./Types/Users";
import { Context } from "./Types/Context";

@Resolver()
export class UserResolver {
  @Query(() => String)
  alex() {
    return "first one";
  }

  @Query(() => [Users])
  async users() {
    const users = await AuthUsers.find();
    return users;
  }

  @Mutation(() => Boolean)
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

    res.cookie(
      "awsj",
      sign({ userId: user.id }, process.env.REFRESHTOKEN_SECRET!, {
        expiresIn: "7d",
      }),
      {
        httpOnly: true,
      }
    );

    return {
      accessToken: sign(
        { userId: user.id, email: user.email },
        process.env.ACCESSTOKEN_SECRET!,
        { expiresIn: "10m" }
      ),
    };
  }
}

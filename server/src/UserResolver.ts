import { Resolver, Query, Mutation, Arg } from "type-graphql";
import AuthUsers from "./models/authUsers";
import { hash } from "bcryptjs";

// @ObjectType()
// class AuthUser {
//   @Field({ nullable: true })
//   id?: string;

//   @Field()
//   email: string;

//   @Field()
//   password: string;
// }

@Resolver()
export class UserResolver {
  @Query(() => String)
  alex() {
    return "first one";
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
}

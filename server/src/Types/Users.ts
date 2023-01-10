import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Users {
  @Field()
  id: string;

  @Field()
  email: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
}

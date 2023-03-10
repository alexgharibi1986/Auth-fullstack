import { LoginDocument } from "../generated/graphql";

export const mockLoginMutation = [
  {
    request: {
      query: LoginDocument,
      variables: {
        password: "Password1!",
        email: "alex@test.com",
      },
    },
    result: {
      data: {
        login: {
          accessToken: "FAKE_TOKEN",
        },
      },
    },
  },
];

export const mockLoginMutationError = [
  {
    request: {
      query: LoginDocument,
      variables: {
        password: "Password1!",
        email: "alex@test.com",
      },
    },
    error: new Error("API Error"),
  },
];

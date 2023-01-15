import { SignupDocument } from "../generated/graphql";

export const mockSignupMutation = [
  {
    request: {
      query: SignupDocument,
      variables: {
        password: "Password1!",
        email: "alex@test.com",
      },
    },
    result: {
      data: {},
    },
  },
];

export const mockSignupMutationError = [
  {
    request: {
      query: SignupDocument,
      variables: {
        password: "Password1!",
        email: "alex@test.com",
      },
    },
    error: new Error("API Error"),
  },
];

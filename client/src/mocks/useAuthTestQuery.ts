import { AuthTestDocument } from "../generated/graphql";

export const mockAuthTestQuery = [
  {
    request: {
      query: AuthTestDocument,
    },
    result: {
      data: {
        authUser: "Alex Gharibi",
      },
    },
  },
];

export const mockAuthTestQueryError = [
  {
    request: {
      query: AuthTestDocument,
    },
    error: new Error("Error Test"),
  },
];

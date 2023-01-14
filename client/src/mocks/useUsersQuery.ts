import { UsersDocument } from "../generated/graphql";

export const mockUsersQuery = [
  {
    request: {
      query: UsersDocument,
    },
    result: {
      data: {
        users: [
          {
            id: "some-long-id",
            email: "alex@test.com",
          },
        ],
      },
    },
  },
];

export const mockUsersQueryError = [
  {
    request: {
      query: UsersDocument,
    },
    error: new Error("Error Test"),
  },
];

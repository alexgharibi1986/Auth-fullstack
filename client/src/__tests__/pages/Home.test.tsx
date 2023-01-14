/* eslint-disable testing-library/no-render-in-setup */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockUseUsersQuery } from "../../mocks/useUsersQuery";
import { useUsersQuery } from "../../generated/graphql";
import Home from "../../pages/Home";

describe("Home page success state", () => {
  beforeEach(() => {
    (useUsersQuery as jest.Mock).mockImplementation(() => {
      return { ...mockUseUsersQuery };
    });
    render(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header and the email with id", async () => {
    expect(screen.getByText("Registered Users:")).toBeTruthy();
    expect(screen.getByText("- Email: alex.g@test.com")).toBeTruthy();
    expect(screen.getByText("Id: some-long-id")).toBeTruthy();
  });
});

describe("Home page error state", () => {
  beforeEach(() => {
    (useUsersQuery as jest.Mock).mockImplementation(() => {
      return {
        ...mockUseUsersQuery,
        error: { message: "Error Test" },
        data: null,
      };
    });
    render(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the error with header", async () => {
    expect(screen.getByText("Registered Users:")).toBeTruthy();
    expect(screen.getByText("Error Test")).toBeTruthy();
  });
});

describe("Home page loading state", () => {
  beforeEach(() => {
    (useUsersQuery as jest.Mock).mockImplementation(() => {
      return {
        ...mockUseUsersQuery,
        loading: true,
      };
    });
    render(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading without header", async () => {
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(screen.queryByText("Registered Users:")).toBeFalsy();
  });
});

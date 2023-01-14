/* eslint-disable testing-library/no-render-in-setup */

import { render, screen } from "@testing-library/react";
import { mockUsersQuery, mockUsersQueryError } from "../../mocks/useUsersQuery";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../../pages/Home";

describe("Home page success state", () => {
  it("renders the header and the email with id", async () => {
    render(
      <MockedProvider mocks={mockUsersQuery} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText("Registered Users:")).toBeTruthy();
    expect(screen.getByText("- Email: alex@test.com")).toBeTruthy();
    expect(screen.getByText("Id: some-long-id")).toBeTruthy();
  });
});

describe("Home page error state", () => {
  it("renders the error with header", async () => {
    render(
      <MockedProvider mocks={mockUsersQueryError} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText("Registered Users:")).toBeTruthy();
    expect(screen.getByText("Error Test")).toBeTruthy();
  });
});

describe("Home page loading state", () => {
  it("renders the loading without header", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(screen.queryByText("Registered Users:")).toBeFalsy();
  });
});

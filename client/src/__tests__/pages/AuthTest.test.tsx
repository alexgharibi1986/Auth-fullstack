/* eslint-disable testing-library/no-render-in-setup */

import { render, screen } from "@testing-library/react";
import {
  mockAuthTestQuery,
  mockAuthTestQueryError,
} from "../../mocks/useAuthTestQuery";
import { MockedProvider } from "@apollo/client/testing";
import AuthTest from "../../pages/AuthTest";

describe("Home page success state", () => {
  it("renders the header and the email with id", async () => {
    render(
      <MockedProvider mocks={mockAuthTestQuery} addTypename={false}>
        <AuthTest />
      </MockedProvider>
    );
    expect(await screen.findByText("Alex Gharibi")).toBeTruthy();
  });
});

describe("Home page error state", () => {
  it("renders the error with header", async () => {
    render(
      <MockedProvider mocks={mockAuthTestQueryError} addTypename={false}>
        <AuthTest />
      </MockedProvider>
    );
    expect(await screen.findByText("Error Test")).toBeTruthy();
  });
});

describe("Home page loading state", () => {
  it("renders the loading without header", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthTest />
      </MockedProvider>
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(screen.queryByText("Registered Users:")).toBeFalsy();
  });
});

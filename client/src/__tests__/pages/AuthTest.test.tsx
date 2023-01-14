/* eslint-disable testing-library/no-render-in-setup */

import { render, screen } from "@testing-library/react";
import {
  mockAuthTestQuery,
  mockAuthTestQueryError,
} from "../../mocks/useAuthTestQuery";
import { MockedProvider } from "@apollo/client/testing";
import AuthTest from "../../pages/AuthTest";

describe("Auth page success state", () => {
  it("renders the auth user", async () => {
    render(
      <MockedProvider mocks={mockAuthTestQuery} addTypename={false}>
        <AuthTest />
      </MockedProvider>
    );
    expect(await screen.findByText("Alex Gharibi")).toBeTruthy();
  });
});

describe("Auth page error state", () => {
  it("renders the error", async () => {
    render(
      <MockedProvider mocks={mockAuthTestQueryError} addTypename={false}>
        <AuthTest />
      </MockedProvider>
    );
    expect(await screen.findByText("Error Test")).toBeTruthy();
  });
});

describe("Auth page loading state", () => {
  it("renders the loading", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthTest />
      </MockedProvider>
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
  });
});

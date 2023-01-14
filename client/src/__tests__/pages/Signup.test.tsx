/* eslint-disable testing-library/no-render-in-setup */

import { render, screen, waitFor } from "@testing-library/react";
import { mockSignupMutation } from "../../mocks/useSignupMutation";
import { formSubmit } from "./Login.test";
import Signup from "../../pages/Signup";
import { useNavigate } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

const navigate = jest.fn();

describe("Sign up", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => {
      return navigate;
    });

    render(
      <MockedProvider mocks={mockSignupMutation} addTypename={false}>
        <Signup />
      </MockedProvider>
    );
  });

  it("renders the login page", async () => {
    expect(screen.getByText("Submit")).toBeTruthy();
  });

  it("submits the for with correct values", async () => {
    formSubmit("alex@test.com", "Password1!", "Submit");

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  it("does not submit with wrong email", async () => {
    formSubmit("alex.com", "Password1!", "Submit");

    expect(await screen.findByText("Invalid email address")).toBeTruthy();
  });

  it("does not submit with wrong password", async () => {
    formSubmit("alex@test.com", "Pass", "Submit");

    expect(
      await screen.findByText(
        "Password must be between 8-20 characters, at least 1 number and 1 special character."
      )
    ).toBeTruthy();
  });
});

/* eslint-disable testing-library/no-render-in-setup */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockLoginMutation } from "../../mocks/useLoginMutation";
import Login from "../../pages/Login";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { MockedProvider } from "@apollo/client/testing";

const mockAuthValues = {
  isAuth: false,
  setIsAuth: jest.fn(),
};
const navigate = jest.fn();

export const formSubmit = (email: string, password: string, button: string) => {
  const emailBox = screen.getByPlaceholderText("Email");
  const passwordBox = screen.getByPlaceholderText("Password");
  fireEvent.change(emailBox, { target: { value: email } });
  fireEvent.change(passwordBox, { target: { value: password } });
  fireEvent.click(screen.getByText(button));
};

describe("Login", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => {
      return navigate;
    });

    render(
      <AuthContext.Provider value={mockAuthValues}>
        <MockedProvider mocks={mockLoginMutation} addTypename={false}>
          <Login />
        </MockedProvider>
      </AuthContext.Provider>
    );
  });

  it("renders the login page", async () => {
    expect(screen.getByText("Login")).toBeTruthy();
  });

  it("submits the for with correct values", async () => {
    formSubmit("alex@test.com", "Password1!", "Login");

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/auth");
    });

    expect(mockAuthValues.setIsAuth).toHaveBeenCalledWith(true);
  });

  it("does not submit with wrong email", async () => {
    formSubmit("alex.com", "Password1!", "Login");

    expect(await screen.findByText("Invalid email address")).toBeTruthy();
  });

  it("does not submit with wrong password", async () => {
    formSubmit("alex@test.com", "Pass", "Login");

    expect(
      await screen.findByText(
        "Password must be between 8-20 characters, at least 1 number and 1 special character."
      )
    ).toBeTruthy();
  });
});

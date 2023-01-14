/* eslint-disable testing-library/no-render-in-setup */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockLogoutMutation } from "../../mocks/useLogoutMutation";
import { MockedProvider } from "@apollo/client/testing";
import Navigation from "../../components/Navigation";
import AuthContext from "../../context/auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const mockAuthValues = {
  isAuth: true,
  setIsAuth: jest.fn(),
};

const navigate = jest.fn();

const location = {
  pathname: "/login",
};

describe("Auth page success state", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => {
      return navigate;
    });

    (useLocation as jest.Mock).mockImplementation(() => {
      return location;
    });
    render(
      <AuthContext.Provider value={mockAuthValues}>
        <MockedProvider mocks={mockLogoutMutation} addTypename={false}>
          <Navigation />
        </MockedProvider>
      </AuthContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the auth user", async () => {
    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("shows Logout button when the user is authenticated", () => {
    expect(screen.getByText("Logout")).toBeTruthy();
  });

  it("I do", async () => {
    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(mockAuthValues.setIsAuth).toHaveBeenCalledWith(false);
    });
    expect(navigate).toHaveBeenCalledWith("/");
  });
});

import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAccessToken, setAccessToken } from "../auth/accessToken";
import ROUTES from "../constant/ROUTES";
import AuthContext from "../context/auth/AuthContext";
import { useLogoutMutation } from "../generated/graphql";

const Navigation = () => {
  const [logout] = useLogoutMutation();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const className = (route: string) => {
    if (location.pathname === route) {
      return "text-red-500";
    }
    return "hover:text-blue-500";
  };

  const handleLogout = async () => {
    await logout();
    setIsAuth(false);
    setAccessToken("");
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="p-5">
      <div className="flex flex-row justify-end space-x-6 items-center">
        <Link className={className(ROUTES.HOME)} to={ROUTES.HOME}>
          Home
        </Link>
        <Link className={className(ROUTES.SIGN_UP)} to={ROUTES.SIGN_UP}>
          Sign up
        </Link>
        <Link className={className(ROUTES.LOGIN)} to={ROUTES.LOGIN}>
          Login
        </Link>
        <Link className={className(ROUTES.AUTH_TEST)} to={ROUTES.AUTH_TEST}>
          Auth Test
        </Link>

        {isAuth && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

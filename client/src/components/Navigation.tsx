import { Link, useLocation } from "react-router-dom";
import { setAccessToken } from "../auth/accessToken";
import ROUTES from "../constant/ROUTES";
import { useLogoutMutation } from "../generated/graphql";

const Navigation = () => {
  const [logout, { client }] = useLogoutMutation();
  const location = useLocation();

  const className = (route: string) => {
    if (location.pathname === route) {
      return "text-red-500";
    }
    return "hover:text-blue-500";
  };

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  };

  return (
    <nav className="p-5">
      <div className="flex flex-row justify-end space-x-6">
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
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;

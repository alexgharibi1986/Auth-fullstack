import { Link } from "react-router-dom";
import { setAccessToken } from "../auth/accessToken";
import { useLogoutMutation } from "../generated/graphql";

const Navigation = () => {
  const [logout, { client }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Login</Link>
      <Link to="/auth">Auth Test</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navigation;

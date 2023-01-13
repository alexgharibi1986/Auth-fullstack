import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Login</Link>
      <Link to="/auth">Auth Test</Link>
    </div>
  );
};

export default Navigation;

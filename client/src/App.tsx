import { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { refreshAccessToken } from "./auth/refreshAccessToken";
import Navigation from "./components/Navigation";
import AuthTest from "./pages/AuthTest";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ROUTES from "./constant/ROUTES";
import Spinner from "./components/Spinner";

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshAccessToken(setLoading);
  }, []);

  if (loading) {
    return <Spinner className="ml-32 mt-44" />;
  }
  return (
    <BrowserRouter>
      <header>
        <Navigation />
      </header>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGN_UP} element={<Signup />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.AUTH_TEST} element={<AuthTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

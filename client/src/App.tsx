import { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { refreshAccessToken } from "./auth/refreshAccessToken";
import Navigation from "./components/Navigation";
import AuthTest from "./pages/AuthTest";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshAccessToken(setLoading);
  }, []);

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <BrowserRouter>
      <header>
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { ReactNode, useEffect, useState } from "react";
import { getAccessToken } from "../../auth/accessToken";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

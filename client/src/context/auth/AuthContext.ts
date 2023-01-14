import { createContext } from "react";
import { noop } from "lodash";

export interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (e: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: noop,
});

export default AuthContext;

import { createContext } from "react";
import { noop } from "lodash";

export interface AuthContextProps {
  accessToken: string;
  setAccessToken: (e: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  accessToken: "",
  setAccessToken: noop,
});

export default AuthContext;

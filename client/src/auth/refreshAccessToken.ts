import { setAccessToken } from "./accessToken";

export const refreshAccessToken = (setLoading: (e: boolean) => void) => {
  fetch(process.env.REACT_APP_TOKEN_REFRESH!, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
      setLoading(false);
    });
};

import { setAccessToken } from "./accessToken";

export const refreshAccessToken = (setLoading: (e: boolean) => void) => {
  fetch("http://localhost:5000/token_refresh", {
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

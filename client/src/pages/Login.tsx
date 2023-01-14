import { FC, useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useFormik } from "formik";
import { setAccessToken } from "../auth/accessToken";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import ROUTES from "../constant/ROUTES";

const Login: FC = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const response = await login({
        variables: {
          password: values.password,
          email: values.email,
        },
      });

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
        setIsAuth(true);
        navigate(ROUTES.AUTH_TEST);
      }

      resetForm();
    },
  });
  return (
    <div className="m-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2 "
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-10"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

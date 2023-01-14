import { FC, useContext, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useFormik } from "formik";
import { setAccessToken } from "../auth/accessToken";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import ROUTES from "../constant/ROUTES";
import { FormValidation } from "../validation/FormValidation";
import Input from "../components/Input";

const Login: FC = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);

  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
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
        noValidate
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <Input
          placeholder="Email"
          name="email"
          formik={formik}
          labelText="Email Address"
        />
        <Input
          placeholder="Password"
          labelText="Password"
          formik={formik}
          name="password"
          className="mt-10"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

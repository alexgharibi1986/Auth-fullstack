import { FC } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../generated/graphql";

const Signup: FC = () => {
  const navigate = useNavigate();

  const [signup] = useSigninMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await signup({
        variables: {
          password: values.password,
          email: values.email,
        },
      });
      navigate("/");

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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

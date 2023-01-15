import { FC } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../generated/graphql";
import { FormValidation } from "../validation/FormValidation";
import ROUTES from "../constant/ROUTES";
import Input from "../components/Input";
import ErrorBox from "../components/ErrorBox";

const Signup: FC = () => {
  const navigate = useNavigate();

  const [signup, { error }] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      await signup({
        variables: {
          password: values.password,
          email: values.email,
        },
      });
      navigate(ROUTES.HOME);

      resetForm();
    },
  });
  return (
    <div className="m-10">
      <form
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
          type="submit"
        >
          Submit
        </button>
      </form>
      {error && <ErrorBox message={error.message} />}
    </div>
  );
};

export default Signup;

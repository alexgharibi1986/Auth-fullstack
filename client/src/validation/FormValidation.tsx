import { FormikErrors } from "formik";

interface Values {
  email: string;
  password: string;
}

export const FormValidation = (values: Values) => {
  const errors: FormikErrors<Values> = {};

  if (!values.email && values.email !== "") {
    errors.email = "Please enter your email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
    values.email !== ""
  ) {
    errors.email = "Invalid email address";
  }

  if (!values.password && values.password !== "") {
    errors.password = "Please enter a your password";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be between 8-20 characters, at least 1 number and 1 special character.";
  }

  return errors;
};

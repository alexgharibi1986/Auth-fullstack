import { FormikValues } from "formik";

interface InputProps {
  formik: FormikValues;
  labelText: string;
  name: string;
  placeholder: string;
  className?: string;
}

const Input = ({
  formik,
  labelText,
  name,
  placeholder,
  className,
}: InputProps) => {
  return (
    <div className={className}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 "
        htmlFor={name}
      >
        {labelText}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        type={name}
        placeholder={placeholder}
        onChange={formik.handleChange}
        value={formik.values[name]}
      />
      {formik.errors[name] && (
        <div className="text-sm text-red-400 mt-2">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;

interface ErrorBoxProps {
  message: string;
}

const ErrorBox = ({ message }: ErrorBoxProps) => {
  return (
    <div className="bg-blue-100 text-gray-600 shadow-md rounded px-8 pt-6 pb-6 mb-4 mt-10 font-semibold mr-4">
      {message}
    </div>
  );
};

export default ErrorBox;

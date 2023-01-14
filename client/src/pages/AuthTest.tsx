import ErrorBox from "../components/ErrorBox";
import Spinner from "../components/Spinner";
import { useAuthTestQuery } from "../generated/graphql";

const AuthTest = () => {
  const { data, error, loading } = useAuthTestQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <Spinner className="ml-32 mt-44" />;
  }

  return (
    <div className="ml-4">
      <div className="text-gray-700 text-sm font-bold">{data?.authUser}</div>
      {error && <ErrorBox message={error.message} />}
    </div>
  );
};

export default AuthTest;

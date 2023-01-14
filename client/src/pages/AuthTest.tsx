import ErrorBox from "../components/ErrorBox";
import { useAuthTestQuery } from "../generated/graphql";

const AuthTest = () => {
  const { data, error, loading } = useAuthTestQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="ml-4">
      <div className="text-gray-700 text-sm font-bold">{data?.authUser}</div>
      {error && <ErrorBox message={error.message} />}
    </div>
  );
};

export default AuthTest;

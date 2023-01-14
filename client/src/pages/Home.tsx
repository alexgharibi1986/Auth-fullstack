import { FC } from "react";
import Spinner from "../components/Spinner";
import Users from "../components/Users";
import { useUsersQuery } from "../generated/graphql";

const Home: FC = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <Spinner className="ml-32 mt-44" />;
  }
  return (
    <div className="">
      <div className="text-gray-700 text-sm font-bold">Registered Users:</div>
      {data?.users.map((e) => (
        <div key={e.id}>
          <Users id={e.id} email={e.email} />
        </div>
      ))}
    </div>
  );
};

export default Home;

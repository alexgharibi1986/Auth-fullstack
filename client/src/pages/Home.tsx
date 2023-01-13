import { FC } from "react";
import { useUsersQuery } from "../generated/graphql";

const Home: FC = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>Registered Users:</div>
      {data?.users.map((e) => {
        return (
          <div key={e.id}>
            {e.email}, {e.id}
          </div>
        );
      })}
    </div>
  );
};

export default Home;

import React from "react";
import { useAuthTestQuery } from "../generated/graphql";

const AuthTest = () => {
  const { data, error, loading } = useAuthTestQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  return <div>{data?.authUserLists}</div>;
};

export default AuthTest;

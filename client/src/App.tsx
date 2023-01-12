import { useAlexTestQuery } from "./generated/graphql";

function App() {
  const { data, loading } = useAlexTestQuery();

  if (loading || !data) {
    return <div>loading</div>;
  }

  console.log(data.alex);
  return <div>helooooo</div>;
}

export default App;

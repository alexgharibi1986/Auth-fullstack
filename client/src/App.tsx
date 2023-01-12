import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

function App() {
  const { data, loading } = useQuery(gql`
    {
      alex
    }
  `);

  if (loading) {
    return <div>loading</div>;
  }

  console.log(data);
  return <div>helooooo</div>;
}

export default App;

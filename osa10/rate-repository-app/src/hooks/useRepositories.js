import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";


const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;

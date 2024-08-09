import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = id => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network"
  });

  return {
    data,
    loading,
    error
  };
};

export default useRepository;

import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sorting) => {
  
  // lo: ASC RATING_AVERAGE 
  // la: DESC CREATED_AT 
  // hi: DESC RATING_AVERAGE 

  const orderBy = sorting === "la" ? "CREATED_AT" : "RATING_AVERAGE"
  const orderDirection = sorting === "lo" ? "ASC" : "DESC" 

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { 
      orderBy: orderBy,
      orderDirection: orderDirection
    },
    fetchPolicy: "cache-and-network"
  });

  return {
    data,
    loading,
    error
  };
};

export default useRepositories;

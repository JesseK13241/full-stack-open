import { gql } from "@apollo/client";
import { REPOSITORY_DATA } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: 8) {
      edges {
        node {
          ...RepositoryData
        }
      }
    }
  }
  ${REPOSITORY_DATA}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryData
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DATA}
`;

export const ME = gql`
  query me {
    me {
      username
    }
  }
`;

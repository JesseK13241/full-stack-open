import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            rating,
            repositoryName,
            text
          }
        }
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return [createReview, result];
};

export default useCreateReview;

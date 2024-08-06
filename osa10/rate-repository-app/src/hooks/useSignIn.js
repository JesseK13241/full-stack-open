import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password
          }
        }
      });

      if (data && data.authenticate) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
      }

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return [signIn, result];
};

export default useSignIn;

import { useApolloClient, useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-native";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import theme from "../theme";
import Text from "./common/Text";
import View from "./common/View";

const styles = StyleSheet.create({
  appBar: {
    paddingTop: 2.5 * Constants.statusBarHeight,
    paddingLeft: 16,
    height: 4 * Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary
  },
  heading: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginRight: 30
  }
});

const AppBar = () => {
  const { data, loading, error } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const username = data?.me?.username;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.heading}>Repositories</Text>
          </Link>
        </Pressable>
        {username ? (
          <>
            <Pressable>
              <Link to="/create-review">
                <Text style={styles.heading}>Create a review</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/my-reviews">
                <Text style={styles.heading}>My reviews</Text>
              </Link>
            </Pressable>
            <Pressable onPress={signOut}>
              <Text style={styles.heading}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable>
              <Link to="/sign-in">
                <Text style={styles.heading}>Sign-in</Text>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/sign-up">
                <Text style={styles.heading}>Sign-up</Text>
              </Link>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

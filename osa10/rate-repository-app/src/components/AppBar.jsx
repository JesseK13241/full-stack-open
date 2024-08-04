import { StyleSheet, ScrollView, Pressable } from "react-native";
import View from "./View";
import { Link } from "react-router-native";

import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  appBar: {
    paddingTop: 2.5 * Constants.statusBarHeight,
    paddingLeft: 16,
    height: 4 * Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary
  },
  heading: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 30
  }
});

const AppBar = () => {
  return (
    <View
      style={styles.appBar}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.heading}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/sign-in">
            <Text style={styles.heading}>Sign-in</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;

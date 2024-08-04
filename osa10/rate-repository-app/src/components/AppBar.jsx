import { StyleSheet, Pressable } from "react-native";
import View from "./View"
import { Link } from "react-router-native";

import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  appBar: {
    paddingTop: 2 * Constants.statusBarHeight,
    paddingLeft: 16,
    height: 4 * Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary
  },
  heading: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
  }
});

const AppBar = () => {
  return (
    <View horizontal style={styles.appBar}>
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
    </View>
  );
};

export default AppBar;

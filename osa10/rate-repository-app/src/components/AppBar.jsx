import { StyleSheet, View, Pressable } from "react-native";
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
    <View style={styles.appBar}>
      <Pressable onPress={() => console.log("LOL")}>
        <Text style={styles.heading}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;

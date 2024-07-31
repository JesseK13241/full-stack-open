import { StyleSheet, View, Pressable, Text } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: 2 * Constants.statusBarHeight,
    paddingLeft: 16,
    height: 4 * Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  heading: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("LOL")}>
        <Text style={styles.heading}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;

import { View as NativeView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  redBorder: {
    borderColor: "white", // red to debug
    borderWidth: 1
  },
  centered: {
    justifyContent: "space-around",
    alignItems: "center"
  },
  horizontal: {
    flexDirection: "row",
    gap: 10
  },
  container: {
    padding: 10
  },
  noWrap: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10
  }
});

const View = ({ container, centered, horizontal, noWrap, style, ...props }) => {
  const viewStyle = [
    container && styles.container,
    centered && styles.centered,
    horizontal && styles.horizontal,
    noWrap && styles.noWrap,
    styles.redBorder,
    style
  ];
  return (
    <NativeView
      style={viewStyle}
      {...props}
    />
  );
};

export default View;

import { StyleSheet } from "react-native";
import theme from "./theme";

export default StyleSheet.create({
  button: {
    marginTop: 10,
    borderRadius: theme.spacings.borderRadius,
    padding: theme.spacings.padding,
    backgroundColor: theme.colors.primary,
    color: "white",
    alignSelf: "flex-start"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold
  },
  centeredButton: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
    padding: 20,
    width: 250
  },
  errorText: {
    color: "red",
    marginTop: 10
  },
  separator: {
    backgroundColor: theme.colors.background,
    height: 10
  },
  input: {
    width: "auto",
    height: 70,
    color: theme.colors.textSecondary,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: theme.spacings.padding,
    marginTop: 10
  },
  roundedAvatar: {
    aspectRatio: 1,
    borderRadius: theme.spacings.borderRadius
  },
  ratingCircle: {
    borderColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

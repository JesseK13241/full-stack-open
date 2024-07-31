import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  colorSecondary: {
    color: theme.colors.textSecondary
  },
  subheading: {
    fontSize: theme.fontSizes.subheading
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  }
});

const Text = ({ primary, secondary, subheading, bold, style, ...props }) => {
  const textStyle = [
    styles.text,
    primary && styles.colorPrimary,
    secondary && styles.colorSecondary,
    subheading && styles.subheading,
    bold && styles.bold,
    style
  ];

  return (
    <NativeText
      style={textStyle}
      {...props}
    />
  );
};

export default Text;

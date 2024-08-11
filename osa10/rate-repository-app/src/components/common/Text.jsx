import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  subheading: {
    fontSize: theme.fontSizes.subheading
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  }
});

const Text = ({ subheading, bold, style, ...props }) => {
  const textStyle = [
    styles.text,
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

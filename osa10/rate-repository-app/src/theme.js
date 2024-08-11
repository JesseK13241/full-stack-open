import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    primary: "#0366d6",
    background: "#e1e4e8",
  },
  fontSizes: {
    body: 14,
    subheading: 16
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System"
    })
  },
  fontWeights: {
    normal: "400",
    bold: "700"
  },
  spacings: {
    padding: 10,
    borderRadius: 5
  }
};

export default theme;

import React from "react";
import View from "./View";
import { TextInput, Button, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    width: "auto",
    height: 70,
    color: theme.colors.textSecondary,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 20,
    marginTop: 10
  },
  signInButton: {
    marginTop: 10
  }
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: values => {
      console.log(values);
    }
  });
  return (
    <View container>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />
      <View style={styles.signInButton}>
        <Button
          onPress={formik.handleSubmit}
          title="Sign in"
        />
      </View>
    </View>
  );
};

export default SignIn;

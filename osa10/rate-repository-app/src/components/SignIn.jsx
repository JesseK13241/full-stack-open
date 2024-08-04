// if a field has an error, the TextInput component sets the TextInput component's error prop as true. Use the value of the error prop to attach conditional border color to the TextInput component.

import React from "react";
import View from "./View";
import { Text, TextInput, Button, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const styles = StyleSheet.create({
  input: {
    width: "auto",
    height: 70,
    color: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 20,
    marginTop: 10
  },
  inputError: {
    borderColor: "red"
  },
  inputNormal: {
    borderColor: theme.colors.textSecondary
  },
  signInButton: {
    marginTop: 10
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: values => {
      console.log(values);
    }
  });
  return (
    <View container>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username
            ? styles.inputError
            : styles.inputNormal
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password
            ? styles.inputError
            : styles.inputNormal
        ]}
        placeholder="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}

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

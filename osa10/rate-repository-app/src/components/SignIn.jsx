import { useFormik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import View from "./View";

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
  const [signIn, result] = useSignIn();

  const handleSubmit = async values => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: values => {
      handleSubmit(values);
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

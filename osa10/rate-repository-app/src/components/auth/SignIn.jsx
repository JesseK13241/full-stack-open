import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useSignIn from "../../hooks/useSignIn";
import FormikInput from "../common/FormikInput";
import View from "../common/View";

const styles = StyleSheet.create({
  signInButton: {
    marginTop: 10
  },
  errorText: {
    color: "red",
    marginTop: 10
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: values => {
      onSubmit(values);
    }
  });

  return (
    <View container>
      <FormikInput
        fieldName="username"
        placeholder="Username"
        formik={formik}
      />

      <FormikInput
        fieldName="password"
        placeholder="Password"
        formik={formik}
        secureTextEntry={true}
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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async values => {
    try {
      await signIn(values);
      navigate("/");
    } catch (e) {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <SignInContainer onSubmit={handleSubmit} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default SignIn;

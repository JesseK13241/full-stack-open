import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useSignIn from "../../hooks/useSignIn";
import useSignUp from "../../hooks/useSignUp";
import FormikInput from "../common/FormikInput";
import View from "../common/View";

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10
  },
  errorText: {
    color: "red",
    marginTop: 10
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must not exceed 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must not exceed 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required")
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: "", password: "", passwordConfirmation: "" },
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

      <FormikInput
        fieldName="passwordConfirmation"
        placeholder="Password confirmation"
        formik={formik}
        secureTextEntry={true}
      />

      <View style={styles.submitButton}>
        <Button
          onPress={formik.handleSubmit}
          title="Sign up"
        />
      </View>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async values => {
    try {
      await signUp(values);
      await signIn(values);
      navigate("/");
    } catch (e) {
      setError("Sign up failed");
    }
  };

  return (
    <>
      <SignUpContainer onSubmit={handleSubmit} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default SignUp;

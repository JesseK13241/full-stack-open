import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import FormikInput from "./FormikInput";
import View from "./View";

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
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating too small")
    .max(100, "Rating too high"),
  text: yup.string()
});

const FormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { ownerName: "", repositoryName: "", rating: "", text: "" },
    validationSchema,
    onSubmit: values => {
      const submissionValues = {
        ...values,
        rating: parseInt(values.rating)
      };
      onSubmit(submissionValues);
    }
  });

  return (
    <View>
      <FormikInput
        fieldName="ownerName"
        placeholder="Repository owner name"
        formik={formik}
      />
      <FormikInput
        fieldName="repositoryName"
        placeholder="Repository name"
        formik={formik}
      />
      <FormikInput
        fieldName="rating"
        placeholder="Rating between 0 and 100"
        formik={formik}
        keyboardType="numeric"
      />
      <FormikInput
        fieldName="text"
        placeholder="Review"
        formik={formik}
        multiline={true}
      />
      <View style={styles.submitButton}>
        <Button
          onPress={formik.handleSubmit}
          title="Create a review"
        />
      </View>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async values => {
    try {
      const { createReview: reviewData } = await createReview(values);
      navigate(`/repository/${reviewData.repositoryId}`);
    } catch (e) {
      console.error("Error creating review:", e);
      setError("Error creating review. Please try again.");
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default ReviewForm;

import { useFormik } from "formik";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useCreateReview from "../../hooks/useCreateReview";
import FormikInput from "../common/FormikInput";
import View from "../common/View";

import globalStyles from "../../styles";

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
    <View container>
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
      <Pressable
        style={[globalStyles.button, globalStyles.centeredButton]}
        onPress={formik.handleSubmit}>
        <Text style={globalStyles.buttonText}>Create a review</Text>
      </Pressable>
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
      {error && <Text style={globalStyles.errorText}>{error}</Text>}
    </>
  );
};

export default ReviewForm;

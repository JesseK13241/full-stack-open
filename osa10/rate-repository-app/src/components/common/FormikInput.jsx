import { Text, TextInput } from "react-native";

import globalStyles from "../../styles";

const FormikInput = ({
  fieldName,
  placeholder,
  formik,
  multiline = false,
  secureTextEntry = false
}) => {
  return (
    <>
      <TextInput
        style={[
          globalStyles.input,
          formik.touched[fieldName] && formik.errors[fieldName]
            ? { borderColor: "red" }
            : {}
        ]}
        placeholder={placeholder}
        onChangeText={formik.handleChange(fieldName)}
        value={formik.values[fieldName]}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <Text style={{ color: "red" }}>{formik.errors[fieldName]}</Text>
      )}
    </>
  );
};

export default FormikInput;

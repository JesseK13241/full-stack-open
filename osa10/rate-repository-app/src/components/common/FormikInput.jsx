import { StyleSheet, Text, TextInput } from "react-native";
import theme from "../../theme";

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
  }
});

const FormikInput = ({ fieldName, placeholder, formik, multiline = false, secureTextEntry = false }) => {
  return (
    <>
      <TextInput
        style={[
          styles.input,
          formik.touched[fieldName] && formik.errors[fieldName]
            ? styles.inputError
            : styles.inputNormal,
        ]}
        placeholder={placeholder}
        onChangeText={formik.handleChange(fieldName)}
        value={formik.values[fieldName]}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <Text style={{ color: 'red' }}>{formik.errors[fieldName]}</Text>
      )}
    </>
  );
};

export default FormikInput;

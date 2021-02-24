import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string()
    .required("First name is required"),
  lastName: yup.string()
    .required("Last name is required"),
  userName: yup.string()
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default validationSchema;
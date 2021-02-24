import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string()
    .required("First name is required"),
  lastName: yup.string()
    .required("Last name is required")
});

export default validationSchema;
import * as yup from "yup";

const validationSchema = yup.object({
    fullName: yup.string()
        .required("Full name is required"),
    username: yup.string()
        .required("Username is required"),
    email: yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

export default validationSchema;

import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.string()
        .required("Name is required"),
    yearPublished: yup.string()
        .required("Year Published is required"),
    category: yup.string()
        .required("Category is required"),
    author: yup.string()
        .required("Author is required"),
    isbnNumber :yup.string()
        .required("ISBN Number is required"),

});

export default validationSchema;
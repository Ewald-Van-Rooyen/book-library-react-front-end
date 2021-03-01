import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.string()
        .required("Name is required"),
    yearPublished: yup.number()
        .required("Year Published is required"),
    categoryId: yup.string()
        .required("Category is required"),
    authorId: yup.string()
        .required("Author is required"),
    isbnNumber :yup.string()
        .required("ISBN Number is required"),

});

export default validationSchema;

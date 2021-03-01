import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formStyles from "./form.styles";
import {useFormik} from "formik";
import authorValidationSchema from "./author.validation.schema";
import {AuthorFormInterface, AuthorInterface} from "../../interfaces/models.interfaces";
import {GlobalContext} from "../../context/global.state";
import {AuthorFormPropsInterface} from "./form.interfaces";
import axios from "axios";
import {URLS} from "../../utils/constants";
import {useMutation} from "react-query";
import ValidationUtils from "../../utils/validation.utils";
import ErrorMessage from "../ui/error.message";

const AuthorForm = (props: AuthorFormPropsInterface) => {
    const {addAuthor, editAuthor, token, activeUser} = useContext(GlobalContext);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const classes = formStyles();

    const mutation = useMutation(async (author: AuthorInterface | AuthorFormInterface) => {
        const id = (author as AuthorInterface).id || null;

        if (id) {
            const {data} = await axios.put(`${URLS.AUTHOR}/${(author as AuthorInterface).id}`, author, ValidationUtils.generateAuthHeaders(token, activeUser));
            return data;
        } else {
            const {data} = await axios.post(URLS.AUTHOR, author, ValidationUtils.generateAuthHeaders(token, activeUser));
            return data;
        }
    }, {
        onSuccess: (data: AuthorInterface) => {
            const createdAuthor = {id: data.id, firstName: data.firstName, lastName: data.lastName};

            if (props.initialValues) {
                editAuthor(createdAuthor);
            } else {
                addAuthor(createdAuthor);
            }

            props.closeModalCallback();
        },
        onError:()=>{
              setShowErrorMessage(true);
        }
    });

    const formik = useFormik<AuthorFormInterface>({
        initialValues: {
            firstName: props.initialValues?.firstName || "",
            lastName: props.initialValues?.lastName || "",
        },
        validationSchema: authorValidationSchema,
        onSubmit: (values: AuthorFormInterface) => {
            const {firstName, lastName} = values;
            const authorSaveObject = {firstName, lastName};

            if (props.initialValues) {
                // @ts-ignore
                authorSaveObject.id = props.initialValues.id;
            }

            mutation.mutate(authorSaveObject);
        },
    });

    return (<>
            <h1>Author</h1>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus

                            onChange={formik.handleChange}
                            value={formik.values.firstName}

                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"

                            onChange={formik.handleChange}
                            value={formik.values.lastName}

                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                </Grid>
                 {showErrorMessage && <ErrorMessage message={"Add/Update action could not be completed"}/>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                >
                    {props.initialValues ? "Update" : "Add"}
                </Button>
            </form>
        </>
    );
};

export default AuthorForm;

import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formStyles from "./form.styles";
import {useFormik} from "formik";
import categoryValidationSchema from "./category.validation.schema";

import {
    CategoryFormInterface,
    CategoryInterface
} from "../../interfaces/models.interfaces";
import {GlobalContext} from "../../context/global.state";
import {CategoryFormPropsInterface} from "./form.interfaces";
import {useMutation} from "react-query";
import axios from "axios";
import {URLS} from "../../utils/constants";
import ValidationUtils from "../../utils/validation.utils";
import ErrorMessage from "../ui/error.message";

const CategoryForm = (props: CategoryFormPropsInterface) => {
    const {addCategory, editCategory, token, activeUser} = useContext(GlobalContext);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const classes = formStyles();

    const mutation = useMutation(async (category: CategoryInterface | CategoryFormInterface) => {
        const id = (category as CategoryInterface).id || null;

        if (id) {
            const {data} = await axios.put(`${URLS.CATEGORY}/${(category as CategoryInterface).id}`, category, ValidationUtils.generateAuthHeaders(token, activeUser));
            return data;
        } else {
            const {data} = await axios.post(URLS.CATEGORY, category, ValidationUtils.generateAuthHeaders(token, activeUser));
            return data;
        }
    }, {
        onSuccess: (data: CategoryInterface) => {
            const createdCategory = {id: data.id, name: data.name, description: data.description};

            if (props.initialValues) {
                editCategory(createdCategory);

            } else {
                addCategory(createdCategory);
            }

            props.closeModalCallback();
        }, onError: () => {
            setShowErrorMessage(true);
        }
    });

    const formik = useFormik<CategoryFormInterface>({
        initialValues: {
            name: props.initialValues?.name || "",
            description: props.initialValues?.description || "",
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values: CategoryFormInterface) => {
            const {name, description} = values;
            const categorySaveObject = {name, description};

            if (props.initialValues) {
                // @ts-ignore
                categorySaveObject.id = props.initialValues.id;
            }

            mutation.mutate(categorySaveObject);
        },
    });

    return (<>
            <h1>Category</h1>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus

                            onChange={formik.handleChange}
                            value={formik.values.name}

                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"

                            onChange={formik.handleChange}
                            value={formik.values.description}

                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
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

export default CategoryForm;

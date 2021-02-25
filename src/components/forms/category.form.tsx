import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formStyles from "./form.styles";
import {useFormik} from "formik";
import categoryValidationSchema from "./category.validation.schema";

import {CategoryFormInterface} from "../../interfaces/models.interfaces";
import {GlobalContext} from "../../context/global.state";
import {CategoryFormPropsInterface} from "./form.interfaces";

const CategoryForm = (props: CategoryFormPropsInterface) => {
    const {categories, addCategory, editCategory} = useContext(GlobalContext);
    const classes = formStyles();

    const formik = useFormik<CategoryFormInterface>({
        initialValues: {
            name: props.initialValues?.name || "",
            description: props.initialValues?.description || "",
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values: CategoryFormInterface) => {
            const {name, description} = values;
            // TODO remove hack for work without ajax calls
            if (props.initialValues) {
                editCategory({id: props.initialValues.id, name, description});
            } else {
                addCategory({id: (categories.length + 1), name, description});
            }

            props.closeModalCallback();
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
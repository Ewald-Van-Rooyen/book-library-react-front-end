import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formStyles from "./form.styles";
import {useFormik} from "formik";
import bookValidationSchema from "./books.validation.schema";
import {BookFormInterface} from "../../interfaces/models.interfaces";
import {GlobalContext} from "../../context/global.state";
import {BookFormPropsInterface} from "./form.interfaces";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const BooksForm = (props: BookFormPropsInterface) => {
    const {categories, books, authors, addBook, editBook} = useContext(GlobalContext);
    const classes = formStyles();

    const categoryArray = categories.map((category) => {
        return category.name
    });

    const authorArray = authors.map((author) => {
        return author.firstName + author.lastName;
    });

    const formik = useFormik<BookFormInterface>({
        initialValues: {
            name: props.initialValues?.name || "",
            yearPublished: props.initialValues?.yearPublished || "",
            category: props.initialValues?.category || "",
            author: props.initialValues?.author || "",
            isbnNumber: props.initialValues?.isbnNumber || "",
        },
        validationSchema: bookValidationSchema,
        onSubmit: (values: BookFormInterface) => {
            const {name, yearPublished, category, author, isbnNumber} = values;
            // TODO remove hack for work without ajax calls
            if (props.initialValues) {
                editBook({id: props.initialValues.id, name, yearPublished, category, author, isbnNumber});
            } else {
                addBook({id: (books.length + 1), name, yearPublished, category, author, isbnNumber});
            }

            props.closeModalCallback();
        },
    });

    return (<>
            <h1>Books</h1>
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
                            id="yearPublished"
                            label="Year Published"
                            name="yearPublished"
                            autoComplete="yearPublished"

                            onChange={formik.handleChange}
                            value={formik.values.yearPublished}

                            error={formik.touched.yearPublished && Boolean(formik.errors.yearPublished)}
                            helperText={formik.touched.yearPublished && formik.errors.yearPublished}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="isbnNumber"
                            label="Isbn Number"
                            name="isbnNumber"
                            autoComplete="isbnNumber"

                            onChange={formik.handleChange}
                            value={formik.values.isbnNumber}

                            error={formik.touched.isbnNumber && Boolean(formik.errors.isbnNumber)}
                            helperText={formik.touched.isbnNumber && formik.errors.isbnNumber}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Category *</InputLabel>
                            <Select
                                id="category"
                                label="Category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}

                                error={formik.touched.category && Boolean(formik.errors.category)}

                            >
                                <MenuItem value="">Select a category</MenuItem>
                                {categoryArray.map((option) => {
                                    return <MenuItem key={option} value={option}>{option}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Author *</InputLabel>
                            <Select
                                id="author"
                                label="Author"
                                name="author"
                                value={formik.values.author}
                                onChange={formik.handleChange}

                                error={formik.touched.author && Boolean(formik.errors.author)}

                            >
                                <MenuItem value="">Select an author</MenuItem>
                                {authorArray.map((option) => {
                                    return <MenuItem key={option} value={option}>{option}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
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

export default BooksForm;
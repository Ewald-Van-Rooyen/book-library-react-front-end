import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import formStyles from "./form.styles";
import {useFormik} from "formik";
import bookValidationSchema from "./books.validation.schema";
import {
    BookFormInterface,
    BookInterface
} from "../../interfaces/models.interfaces";
import {GlobalContext} from "../../context/global.state";
import {BookFormPropsInterface} from "./form.interfaces";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useMutation} from "react-query";
import axios from "axios";
import {URLS} from "../../utils/constants";
import ValidationUtils from "../../utils/validation.utils";
import ErrorMessage from "../ui/error.message";

const BooksForm = (props: BookFormPropsInterface) => {
    const {categories, authors, token, addBook, editBook, activeUser} = useContext(GlobalContext);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const classes = formStyles();

    const mutation = useMutation(async (book: BookInterface | BookFormInterface) => {
        const id = (book as BookInterface).id || null;

        if (id) {
            const {data} = await axios.put(`${URLS.BOOK}/${(book as BookInterface).id}`, book, ValidationUtils.generateAuthHeaders(token, activeUser));
            return data;
        } else {
            const {data} = await axios.post(URLS.BOOK, book, ValidationUtils.generateAuthHeaders(token, activeUser));
            return data;
        }
    }, {
        onSuccess: (data: BookInterface) => {

            const category = categories.filter((category) => {
                return data.categoryId === category.id;
            })[0];

            data.category = category;

            const author = authors.filter((author) => {
                return data.authorId === author.id;
            })[0];

            data.author = author;

            if (props.initialValues) {
                editBook(data);
            } else {
                addBook(data);
            }

            props.closeModalCallback();
        }, onError: () => {
            setShowErrorMessage(true);
        }
    });


    const formik = useFormik<BookFormInterface>({
        initialValues: {
            name: props.initialValues?.name || "",
            yearPublished: props.initialValues?.yearPublished || 0,
            categoryId: props.initialValues?.categoryId || -1,
            category: props.initialValues?.category || undefined,
            authorId: props.initialValues?.authorId || -1,
            author: props.initialValues?.author || undefined,
            isbnNumber: props.initialValues?.isbnNumber || "",
        },
        validationSchema: bookValidationSchema,
        onSubmit: (values: BookFormInterface) => {
            const {name, yearPublished, categoryId, authorId, isbnNumber} = values;

            const bookSaveObject = {name, yearPublished, categoryId, authorId, isbnNumber};

            if (props.initialValues) {
                // @ts-ignore
                bookSaveObject.id = props.initialValues.id;
            }

            mutation.mutate(bookSaveObject);
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
                                id="categoryId"
                                label="Category"
                                name="categoryId"
                                value={formik.values.categoryId}
                                onChange={formik.handleChange}

                                error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}

                            >
                                <MenuItem value="">Select a category</MenuItem>
                                {categories.map((option) => {
                                    return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Author *</InputLabel>
                            <Select
                                id="authorId"
                                label="Author"
                                name="authorId"
                                value={formik.values.authorId}
                                onChange={formik.handleChange}

                                error={formik.touched.authorId && Boolean(formik.errors.authorId)}

                            >
                                <MenuItem value="">Select an author</MenuItem>
                                {authors.map((option) => {
                                    return <MenuItem key={option.id}
                                                     value={option.id}>{`${option.firstName}  ${option.lastName}`}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
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

export default BooksForm;

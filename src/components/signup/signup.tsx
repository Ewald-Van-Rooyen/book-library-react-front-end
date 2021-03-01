import React, {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";

import signUpStyles from "./signup.styles";
import {useFormik} from "formik";
import signupValidationSchema from "./signup.validation.schema";
import {useMutation} from "react-query";
import {
    AuthenticationInterface,
    SignupInterface,
} from "../../interfaces/models.interfaces";
import {GlobalContext} from "../../context/global.state";
import ValidationUtils from "../../utils/validation.utils";
import {SignupPropsInterface} from "./signup.interfaces";
import AppHeader from "../banners/app.header.banner";
import PageHeader from "../banners/page.header.banner";
import ErrorMessage from "../ui/error.message";

const validationUtils: ValidationUtils = new ValidationUtils();

const Signup = (props: SignupPropsInterface) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const {setToken, setActiveUser} = useContext(GlobalContext);
    const classes = signUpStyles();

    const mutation = useMutation(validationUtils.signUp, {
        onSuccess: (data: AuthenticationInterface) => {
            setToken(data.token);
            props.submitClickCallback();
        },
        onError: (error) => {
            setShowErrorMessage(true);
        }
    });

    const formik = useFormik<SignupInterface>({
        initialValues: {
            fullName: "",
            username: "",
            email: "",
            password: ""
        },
        validationSchema: signupValidationSchema,
        onSubmit: (values: SignupInterface) => {
            setActiveUser(values.username);
            mutation.mutate(values);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <AppHeader/>
                <PageHeader title="Sign up"/>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fullName"
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                autoFocus

                                onChange={formik.handleChange}
                                value={formik.values.fullName}

                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus

                                onChange={formik.handleChange}
                                value={formik.values.username}

                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"

                                onChange={formik.handleChange}
                                value={formik.values.email}

                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"

                                onChange={formik.handleChange}
                                value={formik.values.password}

                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                    </Grid>
                    {showErrorMessage &&
                    <ErrorMessage message={"Invalid user credentials | Server could not be reached"}/>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        size="large"
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link className={classes.anchor} onClick={props.anchorClickCallback} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Signup;

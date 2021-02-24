import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import loginStyles from "./signin.styles";
import loginValidationSchema from "./signin.validation.schema";

import {useFormik} from "formik";
import {LoginValuesInterfaces} from "./signin.interfaces";

interface LoginPropsInterface {
    anchorClickCallback: () => void;
    submitClickCallback: () => void;
}


const Signin = (props: LoginPropsInterface) => {
    const classes = loginStyles();

    const formik = useFormik<LoginValuesInterfaces>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            props.submitClickCallback();
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Book Library
                </Typography>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus

                        onChange={formik.handleChange}
                        value={formik.values.email}

                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link onClick={props.anchorClickCallback} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Signin;

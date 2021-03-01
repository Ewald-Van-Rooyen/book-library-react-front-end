import React, {useContext, useState} from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";

import loginStyles from "./signin.styles";
import loginValidationSchema from "./signin.validation.schema";

import {useFormik} from "formik";
import {useMutation} from "react-query";
import {AuthenticationInterface, SigninInterface} from "../../interfaces/models.interfaces";

import {GlobalContext} from "../../context/global.state";
import ErrorMessage from "../ui/error.message";
import {SigninPropsInterface} from "./signin.interfaces";
import ValidationUtils from "../../utils/validation.utils";
import AppHeader from "../banners/app.header.banner";
import PageHeader from "../banners/page.header.banner";

const validationUtils: ValidationUtils = new ValidationUtils();

/**
 * Sign in screen to validate user login
 * and navigate to the home screen or the Sign up screen
 * @param props
 * @constructor
 */
const Signin = (props: SigninPropsInterface) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const {setToken, setActiveUser} = useContext(GlobalContext);

    const classes = loginStyles();

    const mutation = useMutation(validationUtils.signIn, {
        onSuccess: (data: AuthenticationInterface) => {
            setToken(data.token);

            props.submitClickCallback();
        },
        onError: (error) => {
            setShowErrorMessage(true);
        }
    });

    const formik = useFormik<SigninInterface>({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values: SigninInterface) => {
            setActiveUser(values.username);
            mutation.mutate(values);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <AppHeader/>
                <PageHeader title="Sign in"/>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus

                        onChange={formik.handleChange}
                        value={formik.values.username}

                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
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
                    {showErrorMessage &&
                    <ErrorMessage message={"Invalid user credentials | Server could not be reached"}/>}
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
                            <Link className={classes.anchor} onClick={props.anchorClickCallback} variant="body2">
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

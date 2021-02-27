import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import signUpStyles from "./signup.styles";
import {useFormik} from "formik";
import signupValidationSchema from "./signup.validation.schema";
import {useMutation} from "react-query";
import {
    AuthenticationInterface,
    SignupInterface,
} from "../../interfaces/models.interfaces";
import axios from "axios";
import {URLS} from "../../utils/constants";
import {GlobalContext} from "../../context/global.state";

interface SignupPropsInterface {
    anchorClickCallback: () => void;
    submitClickCallback: () => void;
}

const Signup = (props: SignupPropsInterface) => {
    const {setToken} = useContext(GlobalContext);
    const classes = signUpStyles();

    const mutation = useMutation(async (user: SignupInterface) => {
        const {data} = await axios.post(`${URLS.BASE_URL}signup`, user);
        return data;
    }, {
        onSuccess: (data: AuthenticationInterface) => {
            setToken(data.token);
            props.submitClickCallback();
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
            mutation.mutate(values);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                {/*Move to own component*/}
                <Typography component="h1" variant="h3">
                    Book Library
                </Typography>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
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
                            <Link onClick={props.anchorClickCallback} variant="body2">
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

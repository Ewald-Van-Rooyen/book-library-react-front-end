import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    alert: {
        marginTop:"10px",
        color: "red"
    }
}));

interface ErrorMessagePropsInterface {
    message: string;
}

const ErrorMessage = (props: ErrorMessagePropsInterface) => {
    const classes = useStyles();
    return (
        <Typography className={classes.alert} component="h1" variant="h6">
            {props.message}
        </Typography>
    );
};

export default ErrorMessage;

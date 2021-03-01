import React from "react";
import {Tooltip} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import signOutButtonStyles from "./signout.button.styles";

interface SignOutPropsInterface {
    signOutCallback: () => void;
}

/**
 * Button end the current user session in the Book library
 * @param props receives a callback from the Authentication container that calls the login screen
 * @constructor
 */
const SignOut = (props: SignOutPropsInterface) => {
    const classes = signOutButtonStyles();

    return (
        <Tooltip title="Sign Out" aria-label="signOut">
            <Fab onClick={props.signOutCallback} className={classes.fab} aria-label="signout">
                <ExitToAppIcon/>
            </Fab>
        </Tooltip>);
};

export default SignOut;

import React, {useContext, useState} from "react";

import Signin from "../components/signin/signin";
import Signup from "../components/signup/signup";
import HomePage from "../pages/home/home.page";
import {GlobalContext} from "../context/global.state";
import {MODELS} from "../utils/constants";

/**
 * Controller responsible for rendering the sign-* screens
 * or on successful authentication the home screen
 * @constructor
 */
const AuthenticationContainer = () => {
    const {setToken, setSelectedRow, setActiveModel} = useContext(GlobalContext);
    const [displayLoginScreen, setDisplayLoginScreen] = useState(true);
    const [displaySignupScreen, setDisplaySignupScreen] = useState(false);
    const [displayHomeScreen, setDisplayHomeScreen] = useState(false);

    const displayLoginScreenCallback = (): void => {
        setDisplayLoginScreen(true);
        setDisplaySignupScreen(false);
        setDisplayHomeScreen(false);

        setToken("");
        setSelectedRow(null);
        setActiveModel(MODELS.AUTHOR);
    };

    const displaySignupScreenCallback = (): void => {
        setDisplayLoginScreen(false);
        setDisplaySignupScreen(true);
        setDisplayHomeScreen(false);
    };

    const displayHomeScreenCallback = (): void => {
        setDisplayHomeScreen(true);
        setDisplayLoginScreen(false);
        setDisplaySignupScreen(false);
    };

    return (
        <>
            {displayLoginScreen && <Signin
                anchorClickCallback={displaySignupScreenCallback}
                submitClickCallback={displayHomeScreenCallback}
            />}
            {displaySignupScreen && <Signup
                anchorClickCallback={displayLoginScreenCallback}
                submitClickCallback={displayHomeScreenCallback}
            />}
            {displayHomeScreen && <HomePage
                signOutCallback={displayLoginScreenCallback}/>}
        </>
    );
};

export default AuthenticationContainer;

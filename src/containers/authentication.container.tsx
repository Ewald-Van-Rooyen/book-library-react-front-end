import React, {useState} from "react";
import Signin from "../components/signin/signin";
import Signup from "../components/signup/signup";

import HomePage from "../pages/home/home.page";

const AuthenticationContainer = () => {
    const [displayLoginScreen, setDisplayLoginScreen] = useState(true);
    const [displaySignupScreen, setDisplaySignupScreen] = useState(false);
    const [displayHomeScreen, setDisplayHomeScreen] = useState(false);

    const displayLoginScreenCallback = () => {
        setDisplayLoginScreen(true);
        setDisplaySignupScreen(false);
    };

    const displaySignupScreenCallback = () => {
        setDisplayLoginScreen(false);
        setDisplaySignupScreen(true);
    };

    const displayHomeScreenCallback = () => {
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
            {displayHomeScreen && <HomePage/>}
        </>
    );
};

export default AuthenticationContainer;
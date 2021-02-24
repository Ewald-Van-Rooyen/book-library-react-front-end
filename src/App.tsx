import React from 'react';
import './App.css';
import AuthenticationContainer from "./containers/authentication.container";
import {GlobalProvider} from './context/global.state';

function App() {
    return (
        <GlobalProvider>
            <AuthenticationContainer/>
        </GlobalProvider>
    );
}

export default App;

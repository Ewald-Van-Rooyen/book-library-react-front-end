import React from "react";
import {QueryClient, QueryClientProvider} from "react-query"

import AuthenticationContainer from "./containers/authentication.container";
import {GlobalProvider} from "./context/global.state";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalProvider>
                <AuthenticationContainer/>
            </GlobalProvider>
        </QueryClientProvider>
    );
}

export default App;

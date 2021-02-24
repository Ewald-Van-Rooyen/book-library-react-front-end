import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import TabsController from "../../components/tabs/tabs.controller";
import homePageStyles from "./home.page.styles";
import FloatingButtons from "../../components/buttons/floating.buttons";

const HomePage = () => {
    const classes = homePageStyles();

    return (
        <>
            <Box margin={4}>
                <Container maxWidth="lg">
                    <Box marginBottom={2}>
                        <Typography component="h1" variant="h3" align="center">
                            Book Library
                        </Typography>
                    </Box>
                    <div className={classes.root}>
                        <TabsController/>
                    </div>
                    <FloatingButtons/>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;

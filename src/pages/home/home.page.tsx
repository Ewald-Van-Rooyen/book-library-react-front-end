import React, {useContext, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useQuery} from "react-query";

import Container from "@material-ui/core/Container";
import TabsController from "../../components/tabs/tabs.controller";
import homePageStyles from "./home.page.styles";
import FloatingButtons from "../../components/buttons/floating.buttons";

import axios from "axios";
import {AuthorInterface} from "../../interfaces/models.interfaces";
import {URLS} from "../../utils/constants";
import {GlobalContext} from "../../context/global.state";

const HomePage = () => {
    const {addAuthorsBulk} = useContext(GlobalContext);
    const classes = homePageStyles();

    useQuery("fetchAuthors", async () => {
        const {data} = await axios.get(URLS.AUTHOR);
        addAuthorsBulk(data.authors as Array<AuthorInterface>);
    });

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

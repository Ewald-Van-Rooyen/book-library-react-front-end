import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useQuery} from "react-query";

import Container from "@material-ui/core/Container";
import TabsController from "../../components/tabs/tabs.controller";
import homePageStyles from "./home.page.styles";
import FloatingButtons from "../../components/buttons/floating.buttons";

import axios from "axios";
import {AuthorInterface, CategoryInterface} from "../../interfaces/models.interfaces";
import {URLS} from "../../utils/constants";
import {GlobalContext} from "../../context/global.state";
import ValidationUtils from "../../utils/ValidationUtils";

const HomePage = () => {
    const {addAuthorsBulk, addCategoriesBulk, token} = useContext(GlobalContext);
    const classes = homePageStyles();

    useQuery("fetchAuthors", async () => {
        axios.get(URLS.AUTHOR, ValidationUtils.generateAuthHeaders(token)).then((response) => {
            addAuthorsBulk(response.data as Array<AuthorInterface>)
        });
    });

    useQuery("fetchCategory", () => {
        axios.get(URLS.CATEGORY,ValidationUtils.generateAuthHeaders(token)).then((response) => {
            addCategoriesBulk(response.data as Array<CategoryInterface>);
        });
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

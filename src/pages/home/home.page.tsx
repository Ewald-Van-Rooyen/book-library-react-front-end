import React, {useContext} from "react";
import Box from "@material-ui/core/Box";
import {useQuery} from "react-query";

import Container from "@material-ui/core/Container";
import TabsController from "../../components/tabs/tabs.controller";
import homePageStyles from "./home.page.styles";
import FloatingButtons from "../../components/buttons/floating.buttons";

import axios from "axios";
import {AuthorInterface, BookInterface, CategoryInterface} from "../../interfaces/models.interfaces";
import {URLS} from "../../utils/constants";
import {GlobalContext} from "../../context/global.state";
import ValidationUtils from "../../utils/validation.utils";
import SignOut from "../../components/buttons/signout.button";
import AppHeader from "../../components/banners/app.header.banner";
import {HomePagePropsInterface} from "./home.page.interfaces";

/**
 * Landing page that displays the three models in table form
 * Author is the default landing table tab
 * @param props
 * @constructor
 */
const HomePage = (props: HomePagePropsInterface) => {
    const {addAuthorsBulk, addCategoriesBulk, addBooksBulk, token, activeUser} = useContext(GlobalContext);
    const classes = homePageStyles();

    useQuery("fetchAuthors", async () => {
        axios.get(URLS.AUTHOR, ValidationUtils.generateAuthHeaders(token, activeUser)).then((response) => {
            addAuthorsBulk(response.data as Array<AuthorInterface>);
        });
    });

    useQuery("fetchCategories", () => {
        axios.get(URLS.CATEGORY, ValidationUtils.generateAuthHeaders(token, activeUser)).then((response) => {
            addCategoriesBulk(response.data as Array<CategoryInterface>);
        });
    });

    useQuery("fetchBooks", () => {
        axios.get(URLS.BOOK, ValidationUtils.generateAuthHeaders(token, activeUser)).then((response) => {
            addBooksBulk(response.data as Array<BookInterface>);
        });
    });

    return (
        <>
            <Box margin={4}>
                <SignOut signOutCallback={props.signOutCallback}/>

                <Container maxWidth="lg">
                    <Box marginBottom={2}>
                        <AppHeader/>
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

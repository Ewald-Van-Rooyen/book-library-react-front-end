import React, {createContext, useReducer} from "react";
import AppReducer from "./app.reducer";
import {AuthorInterface, BookInterface, CategoryInterface} from "../interfaces/models.interfaces";
import {MODELS} from "../utils/constants";
import GlobalContextInterface from "./global.state.interface";
import contextDefaultValues from "./global.state.initial.values";

export const GlobalContext = createContext<GlobalContextInterface>(contextDefaultValues);
// @ts-ignore
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, contextDefaultValues);

    const removeCategory = (id: string | number): void => {
        dispatch({
            type: "REMOVE_CATEGORY",
            payload: id
        });
    };

    const removeAuthor = (id: string | number): void => {
        dispatch({
            type: "REMOVE_AUTHOR",
            payload: id
        });
    };

    const removeBook = (id: string | number): void => {
        dispatch({
            type: "REMOVE_BOOK",
            payload: id
        });
    };

    const addCategory = (category: CategoryInterface) => {
        dispatch({
            type: "ADD_CATEGORY",
            payload: category
        });
    };

    const addAuthor = (author: AuthorInterface) => {
        dispatch({
            type: "ADD_AUTHOR",
            payload: author
        });
    };

    const addAuthorsBulk = (authors: Array<AuthorInterface>) => {
        dispatch({
            type: "ADD_AUTHORS_BULK",
            payload: authors
        });
    };

    const addCategoriesBulk = (categories: Array<CategoryInterface>) => {
        dispatch({
            type: "ADD_CATEGORIES_BULK",
            payload: categories
        });
    };

    const addBooksBulk = (books: Array<BookInterface>) => {
        dispatch({
            type: "ADD_BOOKS_BULK",
            payload: books
        });
    };

    const addBook = (book: BookInterface) => {
        dispatch({
            type: "ADD_BOOK",
            payload: book
        });
    };

    const setSelectedRow = (selectedRow: CategoryInterface | AuthorInterface | BookInterface | null) => {
        dispatch({
            type: "SET_SELECTED_ROW",
            payload: selectedRow
        });
    };

    const setActiveModel = (activeModel: MODELS) => {
        dispatch({
            type: "SET_ACTIVE_MODEL",
            payload: activeModel
        });
    };

    const setToken = (token: string) => {
        dispatch({
            type: "SET_TOKEN",
            payload: token
        });
    };

    const setActiveUser = (username: string) => {
        dispatch({
            type: "SET_ACTIVE_USER",
            payload: username
        });
    };

    const editCategory = (category: CategoryInterface) => {
        dispatch({
            type: "EDIT_CATEGORY",
            payload: category
        });
    };

    const editAuthor = (author: AuthorInterface) => {
        dispatch({
            type: "EDIT_AUTHOR",
            payload: author
        });
    };

    const editBook = (book: BookInterface) => {
        dispatch({
            type: "EDIT_BOOK",
            payload: book
        });
    };

    return (<GlobalContext.Provider value={{
        categories: state.categories,
        authors: state.authors,
        books: state.books,

        selectedRow: state.selectedRow,
        activeModel: state.activeModel,
        activeUser: state.activeUser,
        token: state.token,

        removeCategory,
        removeAuthor,
        removeBook,

        addCategory,
        addAuthor,

        addBook,

        addCategoriesBulk,
        addAuthorsBulk,
        addBooksBulk,

        editCategory,
        editAuthor,
        editBook,

        setSelectedRow,
        setActiveModel,
        setToken,
        setActiveUser
    }}>
        {children}
    </GlobalContext.Provider>);
};

import GlobalContextInterface from "./global.state.interface";
import {MODELS} from "../utils/constants";

const contextDefaultValues: GlobalContextInterface = {
    categories: [],
    authors: [],
    books: [],

    selectedRow: null,
    token: "",
    activeUser: "",
    activeModel: MODELS.AUTHOR,

    removeCategory: () => {
    },

    removeAuthor: () => {
    },

    removeBook: () => {
    },

    addCategory: () => {
    },

    addAuthor: () => {
    },

    addBook: () => {
    },

    addAuthorsBulk: () => {
    },

    addCategoriesBulk: () => {
    },

    addBooksBulk: () => {
    },

    editCategory: () => {
    },

    editAuthor: () => {
    },

    editBook: () => {
    },

    setSelectedRow: () => {
    },

    setActiveModel: () => {
    },

    setToken: () => {
    },

    setActiveUser: () => {
    }

};

export default contextDefaultValues;

import GlobalContextInterface from "./global.state.interface";
import {BOOK_ROWS} from "../utils/setup/table.test.data";
import {MODELS} from "../utils/constants";

const contextDefaultValues: GlobalContextInterface = {
    categories: [],
    authors: [],
    books: BOOK_ROWS,

    selectedRow: null,
    token: "",
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

    addAuthorsBulk: () => {
    },

    addCategoriesBulk: () => {
    },

    addBook: () => {
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

};

export default contextDefaultValues;

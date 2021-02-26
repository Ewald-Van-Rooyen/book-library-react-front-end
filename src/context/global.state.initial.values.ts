import GlobalContextInterface from "./global.state.interface";
import { BOOK_ROWS, CATEGORY_ROWS} from "../utils/setup/table.test.data";
import {MODELS} from "../utils/constants";

const contextDefaultValues: GlobalContextInterface = {
    categories: CATEGORY_ROWS,
    authors: [],
    books: BOOK_ROWS,

    selectedRow: null,
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
};

export default contextDefaultValues;

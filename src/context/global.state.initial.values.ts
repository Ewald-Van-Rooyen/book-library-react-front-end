import GlobalContextInterface from "./global.state.interface";
import {AUTHOR_ROWS, BOOK_ROWS, CATEGORY_ROWS} from "../utils/setup/table.test.data";
import {MODELS} from "../utils/constants";

const contextDefaultValues: GlobalContextInterface = {
    categories: CATEGORY_ROWS,
    authors: AUTHOR_ROWS,
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
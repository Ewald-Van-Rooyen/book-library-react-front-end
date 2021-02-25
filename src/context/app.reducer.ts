import {AuthorInterface, BookInterface, CategoryInterface} from "../interfaces/models.interfaces";
import GlobalContextInterface from "./global.state.interface";

const AppReducer = (state: GlobalContextInterface, action: any) => {
    switch (action.type) {
        case "SET_SELECTED_ROW":
            return {
                ...state,
                selectedRow: action.payload
            };
        case "SET_ACTIVE_MODEL":
            return {
                ...state,
                activeModel: action.payload
            };
        case "REMOVE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter((category: CategoryInterface) => category.id !== action.payload)
            };
        case "REMOVE_AUTHOR":
            return {
                ...state,
                authors: state.authors.filter((author: AuthorInterface) => author.id !== action.payload)
            };
        case "REMOVE_BOOK":
            return {
                ...state,
                books: state.books.filter((book: BookInterface) => book.id !== action.payload)
            };
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        case "ADD_AUTHOR":
            return {
                ...state,
                authors: [...state.authors, action.payload]
            };
        case "ADD_BOOK":
            return {
                ...state,
                books: [...state.books, action.payload]
            };
        case "EDIT_CATEGORY":
            const updatedCategory = action.payload;

            const updatedCategories = state.categories.map((category: CategoryInterface) => {
                if (category.id === updatedCategory.id) {
                    return updatedCategory;
                }
                return category;
            });

            return {
                ...state,
                categories: updatedCategories
            };
        case "EDIT_AUTHOR":
            const updatedAuthor = action.payload;

            const updatedAuthors = state.authors.map((author: AuthorInterface) => {
                if (author.id === updatedAuthor.id) {
                    return updatedAuthor;
                }
                return author;
            });

            return {
                ...state,
                authors: updatedAuthors
            };

        case "EDIT_BOOK":
            const updatedBook = action.payload;

            const updatedBooks = state.books.map((book: BookInterface) => {
                if (book.id === updatedBook.id) {
                    return updatedBook;
                }
                return book;
            });

            return {
                ...state,
                books: updatedBooks
            };
        default:
            return state;
    }
};

export default AppReducer;
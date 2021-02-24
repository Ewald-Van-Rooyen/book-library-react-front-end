import {AuthorInterface, BookInterface, CategoryInterface} from "../interfaces/models.interfaces";
import {MODELS} from "../utils/constants";

export default interface GlobalContextInterface {
    categories: Array<CategoryInterface>;
    authors: Array<AuthorInterface>;
    books: Array<BookInterface>;

    selectedRow: CategoryInterface | AuthorInterface | BookInterface | null;
    activeModel: MODELS;

    removeCategory(id: string | number): any;

    removeAuthor(id: string | number): any;

    removeBook(id: string | number): any;

    addCategory(category: CategoryInterface): any;

    addAuthor(author: AuthorInterface): any;

    addBook(book: BookInterface): any;

    editCategory(category: CategoryInterface): any;

    editAuthor(author: AuthorInterface): any;

    editBook(books: BookInterface): any;

    setSelectedRow(selectedRow: CategoryInterface | AuthorInterface | BookInterface | null): any;

    setActiveModel(activeModel: MODELS): any;
}
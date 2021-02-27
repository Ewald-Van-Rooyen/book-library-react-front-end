import {AuthorInterface, BookInterface, CategoryInterface} from "../interfaces/models.interfaces";
import {MODELS} from "../utils/constants";

export default interface GlobalContextInterface {
    categories: Array<CategoryInterface>;
    authors: Array<AuthorInterface>;
    books: Array<BookInterface>;

    selectedRow: CategoryInterface | AuthorInterface | BookInterface | null;
    activeModel: MODELS;
    token: string;

    removeCategory(id: string | number): void;

    removeAuthor(id: string | number): void;

    removeBook(id: string | number): void;

    addCategory(category: CategoryInterface): void;

    addAuthor(author: AuthorInterface): void;

    addAuthorsBulk(authors: Array<AuthorInterface>): void;

    addCategoriesBulk(categories: Array<CategoryInterface>): void;

    addBook(book: BookInterface): void;

    editCategory(category: CategoryInterface): void;

    editAuthor(author: AuthorInterface): void;

    editBook(books: BookInterface): void;

    setSelectedRow(selectedRow: CategoryInterface | AuthorInterface | BookInterface | null): void;

    setActiveModel(activeModel: MODELS): void;

    setToken(token: string): void;
}

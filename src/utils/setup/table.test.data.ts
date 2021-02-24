import {AuthorInterface, BookInterface, CategoryInterface} from "../../interfaces/models.interfaces";

export const AUTHOR_ROWS: Array<AuthorInterface> = [
    {
        id: 1,
        firstName: "John Ronald Reuel",
        lastName: "Tolkien"
    },
    {
        id: 2,
        firstName: "Clive Staples ",
        lastName: "Lewis"
    },
    {
        id: 3,
        firstName: "Theodor Seuss",
        lastName: "Seuss"
    }];

export const CATEGORY_ROWS: Array<CategoryInterface> = [
    {
        id: 1,
        name: "Fantasy",
        description: "Fantasy description stuff here"
    },
    {
        id: 2,
        name: "Children",
        description: "Children description stuff here"

    },
    {
        id: 3,
        name: "Old Fantasy",
        description: "Old Fantasy description stuff here"

    }];

export const BOOK_ROWS: Array<BookInterface> = [
    {
        id: 1,
        name: "Lord of the rings fellowship of the ring",
        yearPublished: "29 July 1954",
        category: "Dark Fantasy",
        author: "John Ronald Reuel Tolkien",
        isbnNumber: "978-3-16-148410-0"
    },
    {
        id: 2,
        name: "The Lion, the Witch and the Wardrobe",
        yearPublished: "16 October 1950",
        category: "Fantasy",
        author: "Clive Staples Lewis",
        isbnNumber: "978-3-16-148410-1"
    },
    {
        id: 3,
        name: "Horton Hatches the Egg",
        yearPublished: "19 June 1940",
        category: "Children",
        author: "Theodor Seuss",
        isbnNumber: "978-3-16-148410-2"
    }
];
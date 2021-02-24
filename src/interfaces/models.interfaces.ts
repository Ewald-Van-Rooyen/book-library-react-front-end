export interface AuthorFormInterface {
    firstName: string;
    lastName: string;
}

export interface CategoryFormInterface {
    name: string;
    description: string;
}

export interface BookFormInterface {
    name: string;
    yearPublished: string;
    category: string;
    author: string;
    isbnNumber: string;
}

export interface AuthorInterface extends AuthorFormInterface {
    id: number;
}

export interface CategoryInterface extends CategoryFormInterface {
    id: number;
}

export interface BookInterface extends BookFormInterface {
    id: number;
}

export enum DialogTypeEnum {
    ADD,
    EDIT
}
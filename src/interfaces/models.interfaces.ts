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
    yearPublished: number;
    categoryId: number;
    authorId: number;
    isbnNumber: string;

    author?: AuthorFormInterface;
    category?: CategoryInterface;
}

export interface SignupInterface {
    fullName: string;
    username: string;
    password: string;
    email: string;
}

export interface SigninInterface {
    username: string;
    password: string;
}

export interface AuthenticationInterface {
    authorized: boolean;
    token: string;
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

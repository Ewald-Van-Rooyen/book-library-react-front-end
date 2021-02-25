import {AuthorInterface, BookInterface, CategoryInterface} from "../../interfaces/models.interfaces";

export interface FormPropsInterface {
    closeModalCallback: () => void;
}

export interface AuthorFormPropsInterface extends FormPropsInterface {
    initialValues: AuthorInterface | null;
}

export interface CategoryFormPropsInterface extends FormPropsInterface {
    initialValues: CategoryInterface | null;
}

export interface BookFormPropsInterface extends FormPropsInterface {
    initialValues: BookInterface | null;
}
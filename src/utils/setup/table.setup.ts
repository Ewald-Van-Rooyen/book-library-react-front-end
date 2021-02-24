import {ColDef} from "@material-ui/data-grid";

export const AUTHOR_COLUMNS: Array<ColDef> = [
    {field: "firstName", headerName: "First name", flex: 0.5},
    {field: "lastName", headerName: "Last name", flex: 0.5}
];

export const CATEGORY_COLUMNS: Array<ColDef> = [
    {field: "name", headerName: "Name", flex: 0.5},
    {field: "description", headerName: "Description", flex: 0.5}
];

export const BOOK_COLUMNS: Array<ColDef> = [
    {field: "name", headerName: "Name", flex: 0.25},
    {field: "author", headerName: "Author", flex: 0.25},
    {field: "category", headerName: "Category", flex: 0.25},
    {field: "isbnNumber", headerName: "Isbn Number", flex: 0.25},
    {field: "yearPublished", headerName: "Published Year", flex: 0.25}
];

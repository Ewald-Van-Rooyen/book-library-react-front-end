export enum MODELS {
    AUTHOR,
    CATEGORY,
    BOOK
}

const BASE_URL = "http://localhost:3000/api/v1/";

export const URLS = Object.freeze({
    AUTHOR: `${BASE_URL}author`
});

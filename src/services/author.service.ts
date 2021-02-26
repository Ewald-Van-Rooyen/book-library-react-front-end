import axios from "axios";
import {AuthorInterface} from "../interfaces/models.interfaces";

const authorBaseURL = "http://localhost:3000/api/v1/author";

class AuthorService {

    fetchAllAuthors = async () => {
        try {
            const response = await axios.get<Array<AuthorInterface>>(authorBaseURL);
            return response.data as Array<AuthorInterface>;
        } catch (error) {
            console.error(error);
        }
        return [];
    };
}

export default AuthorService;

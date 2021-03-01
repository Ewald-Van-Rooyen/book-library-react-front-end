import {SigninInterface, SignupInterface} from "../interfaces/models.interfaces";
import axios from "axios";
import {URLS} from "./constants";

/**
 * Util to handle validation processing
 * Generates the header options with the token
 * Makes ajax axios calls to the user authentication service/API
 */
class ValidationUtils {
    static generateAuthHeaders(token: string, username: string): object {
        return {
            headers: {
                "x-access-token": token, // The token is a variable which holds the token
                "x-access-username": username // Used by the BE to user interaction with the models
            }
        };
    }

    async signIn(user: SigninInterface) {
        const {data} = await axios.post(`${URLS.BASE_URL}signin`, user);
        return data;
    }

    /**
     * Wrapper needed to expose async signIn statically
     * @param user
     */
    static signIn(user: SigninInterface): any {
        return this.signIn(user);
    }

    async signUp(user: SignupInterface) {
        const {data} = await axios.post(`${URLS.BASE_URL}signup`, user);
        return data;
    }

    /**
     * Wrapper needed to expose async signUp statically
     * @param user
     */
    static signUp(user: SignupInterface): any {
        return this.signUp(user);
    }
}

export default ValidationUtils;

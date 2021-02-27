class ValidationUtils {
    static generateAuthHeaders(token: string) {
        return {
            headers: {
                "x-access-token": token //the token is a variable which holds the token
            }
        }
    }
}

export default ValidationUtils;

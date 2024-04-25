import { jwtDecode } from "jwt-decode";


const VerifyAccessToken = async (access_token) => {

    const result = { status: null, data: null };

    if (access_token) {
        const decoded_data = jwtDecode(access_token);
        const expirationTimestamp = decoded_data.exp * 1000;
        const currentTimestamp = new Date().getTime();

        if (currentTimestamp < expirationTimestamp) {
            result.status = true
            
            result.data = { "id": decoded_data.data.user_id, "role": decoded_data.data.role }
            return result
        } else {
            
            result.status = false
            return result
        }
    } else {

        result.status = false
        return result

    }


};

export { VerifyAccessToken };

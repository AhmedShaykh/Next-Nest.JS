import axios from "axios";

export async function LoginAPI(formData: any) {

    try {

        const response = await axios.post(`http://localhost:8080/api/auth/signin`, formData);

        return response;

    } catch (error) {

        return error;

    }

};
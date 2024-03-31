import { development } from "../Environment/environment";
import axios from 'axios'

export const loginService = async (login) => {
    const url = development.url + '/api/auth/login';

    // console.log(login);

    return axios.post(url, login)
        .then(response => {
            // Handle successful response
            console.log('Login successful:', response.data);
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred during login:', error);
            throw error; // Throw error for further handling if needed
        });
    
}
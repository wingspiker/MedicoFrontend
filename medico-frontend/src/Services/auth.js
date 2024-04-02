import { development } from "../Environment/environment";
import axios from 'axios'

const url = development.url

export const loginService = async (login) => {
    // const url = development.url + '/api/auth/login';

    // console.log(login);

    return axios.post(url+ '/api/auth/login', login)
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

export const getEmailOtp = async  (email) => {
    const e = email.replace('@','%40')
    return axios.get(url+ `/api/newuser/email/get-otp?Email=${e}`)
        .then(response => {
            // Handle successful response
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred:', error);
            throw error; // Throw error for further handling if needed
        });    
}

export const verifyEmailOtp = async  (otpData) => {
    return axios.post(url+ `/api/newuser/email/verify-otp`, otpData)
        .then(response => {
            // Handle successful response
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred', error);
            throw error; // Throw error for further handling if needed
        });    
}

export const getMobileOtp = async  (mobile) => {
    return axios.get(url+ `/api/newuser/email/get-otp?Mobile=${mobile}`)
        .then(response => {
            // Handle successful response
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred:', error);
            throw error; // Throw error for further handling if needed
        });    
}

export const verifyMobileOtp = async  (mobileData) => {
    return axios.post(url+ `/api/newuser/email/verify-otp`, mobileData)
        .then(response => {
            // Handle successful response
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred', error);
            throw error; // Throw error for further handling if needed
        });    
}


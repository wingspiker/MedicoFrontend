import { development } from "../Environment/environment";
import axios from 'axios'

const url = development.url

export const getStates = async () => {
    // const url = development.url + '/api/auth/login';

    // console.log(login);

    return axios.get(url+ '/api/location/states')
        .then(response => {
            // Handle successful response
            // console.log(response.data);
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred during login:', error);
            throw error; // Throw error for further handling if needed
        });
    
}

export const getDistricts = async (stateId) => {

    return axios.get(url+ `/api/location/districts/${stateId}`)
        .then(response => {
            // Handle successful response
            // console.log(response.data);
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred during login:', error);
            throw error; // Throw error for further handling if needed
        });
    
}

export const getTalukas = async (districtId) => {

    return axios.get(url+ `/api/location/talukas/${districtId}`)
        .then(response => {
            // Handle successful response
            // console.log(response.data);
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred during login:', error);
            throw error; // Throw error for further handling if needed
        });
    
}
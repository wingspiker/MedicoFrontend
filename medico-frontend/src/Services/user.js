import axios from 'axios'
import { token } from './auth';

const url = process.env.REACT_APP_API_BASE_URL

const jwtToken = token();

export const registerBuyer = async (buyerDetails) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${jwtToken}`
        }
      };
      console.log(config);
    
    return axios.post(url+ '/api/user/buyer', buyerDetails, config)
        .then(response => {
            // Handle successful response
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred during login:', error);
            throw error; // Throw error for further handling if needed
        });
    
}

export const registerCompany = async (companyDetails) => {

    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${jwtToken}`
        }
      };
    
    return axios.post(url+ '/api/user/company', companyDetails, config)
        .then(response => {
            // Handle successful response
            return response.data; // Return data if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error occurred during login:', error);
            throw error; // Throw error for further handling if needed
        });
    
}
import axios from 'axios'
import { token } from './auth';

const url = process.env.REACT_APP_API_BASE_URL

export const addDivision = async (divisionData) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.post(url+ `/api/division`,divisionData, config)
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

export const getDivisions = async () => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.get(url+ `/api/division`, config)
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

export const deleteDivision = async (divId) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.delete(url+ `/api/division/${divId}`, config)
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
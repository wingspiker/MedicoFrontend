import axios from 'axios'
import { token } from './auth';


const url = process.env.REACT_APP_API_BASE_URL

export const addBatch = async (batchData) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      console.log(config);
    
    return axios.post(url+ '/api/batch/create', batchData, config)
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

export const editBatch = async (batchData) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      console.log(config);
    
    return axios.put(url+ `/api/batch/${batchData.id}`, batchData, config)
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
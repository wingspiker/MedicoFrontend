import axios from 'axios'
import { token } from './auth';

const url = process.env.REACT_APP_API_BASE_URL

export const addGroup = async (groupDetails) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      console.log(config);
    
    return axios.post(url+ '/api/group', groupDetails, config)
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
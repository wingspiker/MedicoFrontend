import axios from 'axios'
import { token } from './auth';

const url = process.env.REACT_APP_API_BASE_URL

export const filterBuyrs = async (filterDetails) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    const id = filterDetails.id;
    const {occupations, degrees} = filterDetails;
    const postData = {occupations, degrees}
    
    
    return axios.post(url+ `/api/group/${id}/buyers-for-talukas`, postData, config)
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
import axios from 'axios'
import { token } from './auth';

const url = process.env.REACT_APP_API_BASE_URL

export const addProduct = async (productDetails) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      console.log(config);
    
    return axios.post(url+ '/api/product', productDetails, config)
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

export const getProducts = async (email) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      console.log(config);
    //   const p = email.replace('@','%40')
    
    return axios.get(url+ `/api/product/products-by-company?companyEmail=${email}`, config)
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

export const getProductById = async (pid) => {
    const t = localStorage.getItem('token');
    const config = {        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      console.log(config);
    //   const p = email.replace('@','%40')
    
    return axios.get(url+ `/api/product/${pid}`, config)
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
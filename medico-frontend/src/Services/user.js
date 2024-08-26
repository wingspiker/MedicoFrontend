import axios from 'axios'
// import { token } from './auth';

const url = process.env.REACT_APP_API_BASE_URL

// const jwtToken = token();

export const registerBuyer = async (buyerDetails) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
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
    const t = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
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

export const registerSalesman = async (salesmanDetails) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.post(url+ '/api/user/salesman', salesmanDetails, config)
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

export const getUserByEmail = async (email) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.get(url+ `/api/user/by-email?email=${email}`, config)
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

export const getCurrentPlanDetails = async (email) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.get(url+ `/api/subscription/${email}/current-plan`, config)
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

export const getDuePayment = async (email, subscriptionId) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.get(url+ `/api/subscription/${email}/due-payment/?newPlan=${subscriptionId}`, config)
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

export const getPaymentError = async (email) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.get(url+ `/api/company/get-payment-error/${email}`, config)
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

export const payDue = async (email, subscriptionId, payment) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.post(url+ `/api/subscription/${email}/pay-due/${subscriptionId}`,payment, config)
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

export const verifySubscriptionPayment = async (companyEmail) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.post(url+ `/api/subscription/${companyEmail}/verify-payment`, config)
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

export const changeChargesType = async (changeObj) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
      //console.log(config);
    
    return axios.post(url+ `/api/company/change-charges-type`, changeObj, config)
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

export const getAllPendingSubscriptions = async () => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.get(url+ `/api/company/pending-payment-verifications-subsription`, config)
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

export const getAllPendingPercentages = async () => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.get(url+ `/api/company/pending-payment-verifications-percentage`, config)
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

export const getAllPendingPercentagesBills = async () => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.get(url+ `/api/company/get-pending-monthly-payment-verifications`, config)
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

export const getMonthlyTurnOver = async (companyEmail) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.get(url+ `/api/company/${companyEmail}/monthly-turnover`, config)
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

export const completepayment = async (billObject, companyEmail) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.post(url+ `/api/company/${companyEmail}/mark-paid`, billObject, config)
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

export const verifyBillPayment = async (verifyObject, companyEmail) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.post(url+ `/api/company/${companyEmail}/mark-payment-verified`, verifyObject, config)
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

export const verifyPercentage = async (verifyObject) => {
    const t = localStorage.getItem('token');
    const config = {
        
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${t}`
        }
      };
    
    return axios.post(url+ `/api/company/set-percentage-value`, verifyObject, config)
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
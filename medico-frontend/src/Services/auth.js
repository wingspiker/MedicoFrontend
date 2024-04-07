import axios from 'axios'
import {jwtDecode as jwt_decode} from 'jwt-decode';


const url = process.env.REACT_APP_API_BASE_URL

export const loginService = async (login) => {
    // const url = development.url + '/api/auth/login';

    // console.log(login);
    

    return axios.post(url+ '/api/auth/login', login)
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
    console.log(otpData);
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

export const getMobileOtp = async  (otpData) => {
    console.log(otpData);
    const e = otpData.email.replace('@','%40')
    return axios.get(url+ `/api/newuser/phone/get-otp?Email=${e}&PhoneNumber=${otpData.mobile}`)
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
    return axios.post(url+ `/api/newuser/phone/verify-otp`, mobileData)
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

// signup

export const signUpService = async (signUpDto) => {
    // const url = development.url + '/api/auth/login';

    // console.log(login);

    return axios.post(url+ '/api/auth/signup', signUpDto)
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

// signout

export const signOut = () => {
    localStorage.removeItem("token");
}

export const token = () => localStorage.getItem("token");

export const decodeToken = () => {
    const currUser = token()? jwt_decode(token()) : null;
    if(currUser && currUser.exp * 1000 < Date.now()){
        signOut();
    }
    return token()? jwt_decode(token()) : null;
}

export let currStep = 1;

export const  setCurrStep = (stepNum) =>{
    currStep=stepNum;
};


// /formdata 

export let formdata  = {
    email: "",
    emailOtp: "",
    mobile: "",
    mobileOtp: "",
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
    role:"",

    //step 3
    companyEmail: "",
    companyName: "",
    licenseNumber: "",
    gstNumber: "",
    panCardNumber: "",
    displayName: "",
    state: "",
    district: "",
    taluka: "",
    companyAddress1: "",
    companyAddress2: "",
    pincode: "",
    logo: "",
    drugLicenseNumber: "",
    wholesaleLicenseNumber: "",
    companyType: "",
    chargeType: "",
    subscription: "",

    //Buyer
    degree: "",
    firstName: "",
    lastName: "",
    occupation: "",
  };;

export const setFormData = (f) =>{
    formdata=f;
};

export let showMessage = false;

export const setMessage = (b) => {
    showMessage = b;
}

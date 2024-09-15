import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { toast } from "sonner";

const url = "https://crmwe5yxfs.ap-south-1.awsapprunner.com";

export const loginService = async (login) => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  return axios
    .post(url + "/api/auth/login", login)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const getEmailOtp = async (email) => {
  const e = email.replace("@", "%40");
  return axios
    .get(url + `/api/newuser/email/get-otp?Email=${e}`)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const verifyEmailOtp = async (otpData) => {
  console.log(otpData);
  return axios
    .post(url + `/api/newuser/email/verify-otp`, otpData)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred", error);
      throw error; // Throw error for further handling if needed
    });
};

export const getMobileOtp = async (otpData) => {
  console.log(otpData);
  const e = otpData.email.replace("@", "%40");
  return axios
    .get(
      url +
        `/api/newuser/phone/get-otp?Email=${e}&PhoneNumber=${otpData.mobile}`
    )
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const verifyMobileOtp = async (mobileData) => {
  return axios
    .post(url + `/api/newuser/phone/verify-otp`, mobileData)
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred", error);

      throw error; // Throw error for further handling if needed
    });
};

// signup

export const signUpService = async (signUpDto) => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  return axios
    .post(url + "/api/auth/signup", signUpDto)
    .then((response) => {
      // Handle successful response
      console.log("Login successful:", response.data);
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

// signout

export const signOut = () => {
  if (isAdmin()) {
    window.location.href = "/admin";
  } else {
    window.location.href = "/login";
  }
  localStorage.removeItem("token");
};

export const token = () => localStorage.getItem("token");

export const decodeToken = () => {
  const t = token();
  const currUser = t ? jwt_decode(t) : null;
  if (currUser && currUser.exp * 1000 < Date.now()) {
    signOut();
    return null;
  }
  return t ? jwt_decode(token()) : null;
};

export const isAdmin = () => {
  const user = decodeToken();
  if (user) {
    const key = Object.keys(user).find((key) => key.endsWith("userType"));
    // console.log(user[key] === "Admin");
    return user[key] === "Admin";
  }
  return false;
};

export const isCompanySelf = () => {
  const user = decodeToken();
  if (user) {
    const key = Object.keys(user).find((key) => key.endsWith("userType"));
    if (user[key] === "Company") {
      return user["CompanyType"] === "SelfSelling";
    }
  }
  return false;
};

export const isCompanyAdmin = () => {
  const user = decodeToken();
  if (user) {
    const key = Object.keys(user).find((key) => key.endsWith("userType"));
    if (user[key] === "Company") {
      return user["CompanyType"] === "AdminSelling";
    }
  }
  return false;
};

export const isBuyer = () => {
  const user = decodeToken();
  if (user) {
    const key = Object.keys(user).find((key) => key.endsWith("role"));
    return user[key] === "Buyer";
  }
  return false;
};

export const isSalesman = () => {
  const user = decodeToken();
  // console.log(user);
  if (user) {
    return user["userType"] === "Salesman";
  }
  return false;
};

export let currStep = 1;

export const setCurrStep = (stepNum) => {
  currStep = stepNum;
};

export let isbuyer = false;

export const setIsBuyer = (b) => {
  isbuyer = b;
};

// /formdata

export let formdata = {
  email: "",
  emailOtp: "",
  mobile: "",
  mobileOtp: "",
  username: "",
  role: "",
  password: "",
  confirmPassword: "",

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
};

export let initialData = {
  email: "",
  emailOtp: "",
  mobile: "",
  mobileOtp: "",
  username: "",
  role: "",
  password: "",
  confirmPassword: "",

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
};

export const setFormData = (f) => {
  formdata = f;
};

export let showMessage = false;

export const setMessage = (b) => {
  showMessage = b;
};

export const getAllUnverifiedBuyers = async () => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  return axios
    .get(url + "/api/user/all-unverified-buyers")
    .then((response) => {
      // Handle successful response
      console.log(response);
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const getAllVerifiedBuyers = async () => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  return axios
    .get(url + "/api/user/all-verified-buyers")
    .then((response) => {
      // Handle successful response
      console.log(response);
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const getAllUnverifiedCompanies = async () => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  return axios
    .get(url + "/api/user/all-unverified-companies")
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const getAllVerifiedCompanies = async () => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  return axios
    .get(url + "/api/user/all-verified-companies")
    .then((response) => {
      // Handle successful response
      return response.data; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

export const forceVerify = async (email) => {
  // const url = development.url + '/api/auth/login';

  // console.log(login);

  const post = { email };

  return axios
    .post(url + "/api/user/force-verify", post)
    .then((response) => {
      // Handle successful response
      console.log(response);
      return response; // Return data if needed
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error; // Throw error for further handling if needed
    });
};

// export const currChargeType = 0;

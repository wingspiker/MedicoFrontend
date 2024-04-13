import axios from "axios";

const url = process.env.REACT_APP_API_BASE_URL;

export const addOffer = async (offerDetails) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .post(url + "/api/offer", offerDetails, config)
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

export const addDiscountBenefit = async (offerId, benefitDetails) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .post(
      url + `/api/offer/${offerId}/benefit/discount`,
      benefitDetails,
      config
    )
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

export const addFreeGoodsBenefit = async (offerId, benefitDetails) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .post(
      url + `/api/offer/${offerId}/benefit/freegoods`,
      benefitDetails,
      config
    )
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

export const addFreeProductsBenefit = async (offerId, benefitDetails) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .post(
      url + `/api/offer/${offerId}/benefit/freeproducts`,
      benefitDetails,
      config
    )
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

export const getOffers = async (email) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };

  return axios
    .get(url + `/company/${email}`, config)
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

import axios from "axios";

const url = process.env.REACT_APP_API_BASE_URL;

export const getOrdersByEmail = async (companyEmail) => {
    const t = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${t}`,
      },
    };
  
    return axios
      .get(url + `/api/order/get-all/company/${companyEmail}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw error; 
      });
  };
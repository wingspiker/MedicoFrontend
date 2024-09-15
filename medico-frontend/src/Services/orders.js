import axios from "axios";

const url = "https://crmwe5yxfs.ap-south-1.awsapprunner.com";

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

export const updateOrderStatus = async (orderId, orderStatus) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };

  return axios
    .post(url + `/api/order/update-status/${orderId}`,{orderStatus}, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
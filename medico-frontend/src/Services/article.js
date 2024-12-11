import axios from "axios";
import { token } from "./auth";
import { url } from "../constants";

// const url = "https://crmwe5yxfs.ap-south-1.awsapprunner.com";

export const addArticle = async (articleData) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };

  return axios
    .post(url + `/api/article`, articleData, config)
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

export const getArticles = async (email) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };

  return axios
    .get(url + `/api/article/user/${email}`, config)
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

export const deleteArticle = async (articleId) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };

  return axios
    .delete(url + `/api/article/${articleId}`, config)
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

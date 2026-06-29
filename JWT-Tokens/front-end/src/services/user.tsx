import axios from "axios";
import { API_URL_BACK_END } from "../utils/constants";

export const checkSession = async () => {
  try {
    const response = await axios.get(API_URL_BACK_END + "/", {
      withCredentials: true,
    });

    return response.data.user;
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
};

export const loginUser = async ({ formData }) => {
  try {
    const response = await axios.post(API_URL_BACK_END + "/login", formData, {
      withCredentials: true,
    });

    return {
      data: response.data,
    };
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
};

export const logoutUser = async () => {
  const response = await axios.post(API_URL_BACK_END + "/logout", {
    withCredentials: true,
  });

  return response.data;
};

export const getProtected = async () => {
  const response = await axios.get(API_URL_BACK_END + "/protected", {
    withCredentials: true,
  });
  
  return response.data;
};

import axios from "axios";
import { API_URL } from "../utils/constans";

export const getAllLocations = async () => {
  try {
    const response = await axios.get(API_URL + "/location");

    return {
      info: response.data.info,
      results: response.data.results,
    };
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
};

export const getLocationById = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `/location/${id}`);

    return {
      results: response.data,
    };
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
};

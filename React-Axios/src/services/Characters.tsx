import axios from "axios";
import { API_URL } from "../utils/constans";

export const getAllCharacters = async () => {
  try {
    const response = await axios.get(API_URL + "/character");

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

export const getCharacterById = async (id: string) => {
  try {
    const response = await axios.get(API_URL + `/character/${id}`);

    return {
      results: response.data,
    };
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
};

export const getCharactersByName = async (name: string) => {
  try {
    const response = await axios.get(API_URL + `/character/?name=${name}`);

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

export const getCharactersByPage = async (page: number) => {
  try {
    const response = await axios.get(API_URL + `/character?page=${page}`);

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

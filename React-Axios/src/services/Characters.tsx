import axios from "axios";
import { API_URL } from "../utils/constans";

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const getAllCharacters: () => Promise<
  | {
      info: Info;
      data: Character[];
    }
  | {
      errorMessage: string;
    }
> = async () => {
  try {
    const response = await axios.get(API_URL + "/character");

    return {
      info: response.data.info,
      data: response.data.results,
    };
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
};

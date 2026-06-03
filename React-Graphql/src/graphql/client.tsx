import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "../utils/constans";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
  }),
  cache: new InMemoryCache(),
});

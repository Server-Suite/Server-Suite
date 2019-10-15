import Axios from "axios";
import { server } from "../constants/appConstants";
export const get = endpoint => {
  return Axios.get(`${server}${endpoint}`);
};
export const getByUrl = url => {
  return Axios.get(url);
};

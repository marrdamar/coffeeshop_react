import axios from "axios";
import store from '../../redux/store'

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_SERVER_HOST;



export const getPromos = (controller) => {
  const url = baseUrl + "/promos";
  return axios.get(url, { signal: controller.signal });
};

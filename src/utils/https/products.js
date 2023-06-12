import axios from "axios";

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_SERVER_HOST;

export const getProducts = (params, controller) => {
  const url = `${baseUrl}/products?${params}`;
  return axios.get(url, { signal: controller.signal });
};

export const getProductsDetails = (params, controller) => {
  const url = `${baseUrl}/products/${params}`;
  return axios.get(url, { signal: controller.signal });
};
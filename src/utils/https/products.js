import axios from "axios";
import store from "../../redux/store";

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_SERVER_HOST;

export const getProducts = (params, controller) => {
  const url = `${baseUrl}/products?${params}`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProductsDetails = (params, controller) => {
  const url = `${baseUrl}/products/${params}`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.get(url, { 
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` }, });
};

// export const addTransactions = (data, controller) => {
//   const url = `${baseUrl}/transactions`;
//   const storeToken = store.getState();
//   const token = storeToken.user.token;
//   return axios.post(url, data, {
//     signal: controller.signal,
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// export const getHistory = (controller) => {
//   const url = `${baseUrl}/transactions`;
//   const storeToken = store.getState();
//   const token = storeToken.user.token;
//   return axios.get(url, {
//     signal: controller.signal,
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

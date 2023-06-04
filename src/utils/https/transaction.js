import axios from "axios";
import store from "../../redux/store";

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_SERVER_HOST;

export const addTransactions = (data, controller) => {
  const url = `${baseUrl}/transactions`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.post(url, data, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getHistory = (controller) => {
  const url = `${baseUrl}/transactions`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

// export const deleteTransaction = (transactionId, productId, controller) => {
//   const url = `${baseUrl}/transactions/${transactionId}?prodId=${productId}`;
export const deleteTransaction = (transactionId, controller) => {
  const url = `${baseUrl}/transactions/${transactionId}`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.delete(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

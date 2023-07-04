import axios from "axios";

// import { get } from "../localStorage";
import store from "../../redux/store";

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const login = (email, password, controller) => {
  const url = `${baseUrl}/auth`;
  const body = { email, password };
  return axios.post(url, body, { signal: controller.signal });
};

export const register = (email, password, phone_number, controller) => {
  const url = `${baseUrl}/auth/register`;
  const body = { email, password, phone_number };
  return axios.post(url, body, { signal: controller.signal });
};

export const forgot = (email, controller) => {
  const url = `${baseUrl}/auth/forgot`;
  return axios.patch(url, { email }, { signal: controller.signal });
};

export const setPassbyForgot = (email, otpCode, password, controller) => {
  const url = `${baseUrl}/auth/editpassbyforgot`;
  const body = { email, otp_code: otpCode, password };
  return axios.patch(url, body, { signal: controller.signal });
};

export const getUser = (controller) => {
  const url = `${baseUrl}/users`;
  const storeToken = store.getState();
  const token = storeToken.user.token
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateDataUser = (file, body, controller) => {
  const url = `${baseUrl}/auth/profile`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  // const storeuserId = store.getState();
  // const userId = storeuserId.user.id
  const formData = new FormData();
  if (file !== "") {
    formData.append("profile_image", file);
  }
  Object.keys(body).forEach((key) => {
    formData.set(key, body[key]);
  });
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editPassword = (body, controller) => {
  const url = `${baseUrl}/auth`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const authLogout = (controller) => {
  const url = `${baseUrl}/auth/logout`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  localStorage.clear();
  console.log(token)
  return axios.patch(url, token, {
    headers: { Authorization: `Bearer ${token}` },
    signal: controller.signal,
  });
};

export const checkToken = (controller) => {
  const url = `${baseUrl}/auth/private`;
  const storeToken = store.getState();
  const token = storeToken.user.token;
  return axios.get(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

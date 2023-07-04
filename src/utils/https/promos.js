import axios from "axios";
import store from "../../redux/store";

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_SERVER_HOST;



export const getPromos = (controller) => {
  const url = baseUrl + `/promos`;
  return axios.get(url, { signal: controller.signal });
};

export const addPromos = (controller, data) => {
  const form_data = new FormData
  for ( var key in data ) {
    form_data.append(key, data[key]);
  }
  const url = baseUrl + `/promos`;
  const storeToken = store.getState();
  const token = storeToken.user.token

  return axios({
    method: 'POST',
    url: url,
    data: form_data,
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    } 
  })
  // return axios.post(url, token, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` }, });
};

import axios from "axios";
import store from "../../redux/store";
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

export const addProduct = (controller, data, file) => {
  const form_data = new FormData
  if (file !== "") {
    form_data.append("image", file);
  }
  for ( var key in data ) {
    form_data.append(key, data[key]);
  }
  const url = baseUrl + `/products`;
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


// export const addProduct = (file, body, controller) => {
//   const formData = new FormData();
//   if (file !== "") {
//     formData.append("image", file);
//   }
//   Object.keys(body).forEach((key) => {
//     formData.set(key, body[key]);
//   });
//   const url = baseUrl + `/products`;
//   const storeToken = store.getState();
//   const token = storeToken.user.token

//   return axios({
//     method: 'POST',
//     url: url,
//     data: formData,
//     signal: controller.signal,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//     } 
//   })
//   // return axios.post(url, token, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` }, });
// };
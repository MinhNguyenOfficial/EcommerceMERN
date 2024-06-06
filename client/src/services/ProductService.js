import axios from 'axios';

const apiEndpoint = import.meta.env.VITE_BACKEND_API_URL;

export const getAllProduct = async (limit = 12) => {
  const res = await axios.get(`${apiEndpoint}/product/get-all?limit=${limit}`);
  return res.data;
};

export const getAllSearchProduct = async (searchText, limit) => {
  const res = await axios.get(
    `${apiEndpoint}/product/get-all?filter=name&filter=${searchText}&limit=${limit}`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${apiEndpoint}/product/create`, data);
  return res.data;
};

export const updateProduct = async (id, data, tokenData) => {
  const response = await axios.put(
    `${apiEndpoint}/product/update/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
      },
      withCredentials: true,
    }
  );
  return response;
};

export const deleteProduct = async (id, tokenData) => {
  const response = await axios.delete(`${apiEndpoint}/product/delete/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenData}`,
    },
    withCredentials: true,
  });
  return response;
};

export const deleteProducts = async (productIdList, tokenData) => {
  const response = await axios.delete(
    `${apiEndpoint}/product/delete-products`,
    {
      data: productIdList,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
      },
      withCredentials: true,
    }
  );
  return response;
};

export const getProductDetails = async (id) => {
  const res = await axios.get(`${apiEndpoint}/product/details/${id}`);
  return res.data;
};

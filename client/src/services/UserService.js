import axios from 'axios';

const apiEndpoint = import.meta.env.VITE_BACKEND_API_URL;

export const axiosJWT = axios.create({
  withCredentials: true,
});

export const loginUser = async (data) => {
  const res = await axios.post(`${apiEndpoint}/user/sign-in`, data, {
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(`${apiEndpoint}/user/sign-up`, data);
  return res.data;
};

export const getUserDetails = async (id, access_token) => {
  const res = await axiosJWT.get(`${apiEndpoint}/user/get-user-details/${id}`, {
    headers: {
      token: `Beaer ${access_token}`,
    },
  });
  return res.data;
};

export const refreshToken = async (tokenData) => {
  const response = await axios.post(
    `${apiEndpoint}/user/refresh-token`,
    { token: tokenData },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${apiEndpoint}/user/log-out`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${apiEndpoint}/user/update-user/${id}`, data);
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axios.get(`${apiEndpoint}/user/get-users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

import apiClient from '../middleware/client';

export const loginUser = async (username, password) => {
  const response = await apiClient.post('/auth/login', {
    username: username,
    password: password,
  });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await apiClient.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};
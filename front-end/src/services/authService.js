import apiClient from '../middleware/client';

export const loginUser = async (username, password) => {
  const response = await apiClient.post('/auth/login', {
    username: username,
    password: password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};
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

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/user');
  return response.data;
};

export const loginAdmin = async (username, password) => {
  const response = await apiClient.post('/auth/admin/login', { username, password });
  return response.data;
};

export const getAdminSession = async () => {
  const response = await apiClient.get('/auth/admin/session');
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await apiClient.post('/auth/admin/logout');
  return response.data;
};
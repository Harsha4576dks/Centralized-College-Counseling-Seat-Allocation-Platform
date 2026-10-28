import apiClient from '../middleware/client';

export const loginUser = async (username, password) => {
  
  const response = await apiClient.post('/auth/login', {
    username: username,
    password: password,
  });

  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }
  
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('access_token');
};
// front-end/src/services/authService.js
import apiClient from '../api/client';

export const loginUser = async (username, password) => {
  // FastAPI OAuth2PasswordRequestForm expects x-www-form-urlencoded
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await apiClient.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // Assuming your backend returns { access_token: "...", token_type: "bearer" }
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }
  
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('access_token');
};
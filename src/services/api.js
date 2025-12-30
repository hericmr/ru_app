import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const getMenu = async () => {
  const response = await api.get('/cardapio');
  return response.data;
};

export const getTodayMenu = async () => {
  const response = await api.get('/cardapio/hoje');
  return response.data;
};

export const getDayMenu = async (day) => {
  const response = await api.get(`/cardapio/${day}`);
  return response.data;
};

export default api;

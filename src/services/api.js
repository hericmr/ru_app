import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://raw.githubusercontent.com/hericmr/ru_api/main/cache',
});

export const getMenu = async () => {
  const response = await api.get('menu.json');
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

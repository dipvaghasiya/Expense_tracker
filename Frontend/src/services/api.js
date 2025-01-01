import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

export const loginUser = async (userData) => {
  return api.post('/auth/login', userData);
};

export const getSummary = async () => {
  return api.get('/transactions/summary');
};

export const getTransactions = async () => {
  return api.get('/transactions');
};

export const addTransaction = async (transactionData) => {
  return api.post('/transactions', transactionData);
};

export const deleteTransaction = async (transactionId) => {
  return api.delete(`/transactions/${transactionId}`);
};

export const getCategories = async () => {
  return api.get('/categories');
};

export const addCategory = async (categoryData) => {
  return api.post('/categories', categoryData);
};

export const updateCategory = async (categoryId, categoryData) => {
  return api.put(`/categories/${categoryId}`, categoryData);
};

export const deleteCategory = async (categoryId) => {
  return api.delete(`/categories/${categoryId}`);
};

export default api;

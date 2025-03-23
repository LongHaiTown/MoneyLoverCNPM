import axios from "axios";

const API_URL = "http://localhost:5000";

export const getExpenses = () => axios.get(`${API_URL}/expenses/`);
export const createExpense = (data) => axios.post(`${API_URL}/expenses`, data);
export const deleteExpense = (id) => axios.delete(`${API_URL}/expenses/${id}`);


export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);

export const getWallets = () => axios.get(`${API_URL}/wallets`);
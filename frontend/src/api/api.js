import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

// Auto attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("taxpal_user") || "{}");
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

// Transactions
export const getTransactions   = ()     => API.get("/api/transactions");
export const createTransaction = (data) => API.post("/api/transactions", data);
export const deleteTransaction = (id)   => API.delete(`/api/transactions/${id}`);

// Budgets
export const getBudgets   = ()     => API.get("/api/budgets");
export const createBudget = (data) => API.post("/api/budgets", data);
export const deleteBudget = (id)   => API.delete(`/api/budgets/${id}`);

// Reports
export const getReports     = ()     => API.get("/api/reports");
export const generateReport = (data) => API.post("/api/reports", data);
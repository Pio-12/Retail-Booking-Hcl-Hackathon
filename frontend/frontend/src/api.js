import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // API Gateway
});

// 🔥 INTERCEPTOR (KEY FIX)
API.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  // If no token (login/register), send dummy token
  if (!token) {
    token = "dummy-token";
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
});

// Tambahkan token ke setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

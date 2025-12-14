import axiosInstance from "./axiosInstance";

export const getSweets = () => axiosInstance.get("/sweets");

export const searchSweets = (params) =>
  axiosInstance.get("/sweets/search", { params });

export const addSweet = (data) =>
  axiosInstance.post("/sweets", data);

export const updateSweet = (id, data) =>
  axiosInstance.put(`/sweets/${id}`, data);

export const deleteSweet = (id) =>
  axiosInstance.delete(`/sweets/${id}`);

export const purchaseSweet = (id) =>
  axiosInstance.post(`/sweets/${id}/purchase`);

export const restockSweet = (id, quantity) =>
  axiosInstance.post(`/sweets/${id}/restock`, { quantity });

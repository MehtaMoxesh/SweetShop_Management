import axiosInstance from './axiosInstance';

export const getCart = () => axiosInstance.get('/cart');
export const addToCart = (sweetId, quantity = 1) =>
  axiosInstance.post('/cart/items', { sweetId, quantity });
export const updateCartItem = (itemId, quantity) =>
  axiosInstance.put(`/cart/items/${itemId}`, { quantity });
export const removeCartItem = (itemId) => axiosInstance.delete(`/cart/items/${itemId}`);
export const checkoutCart = () => axiosInstance.post('/cart/checkout');

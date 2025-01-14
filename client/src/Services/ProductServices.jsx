import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

export const getPaginatedProducts = async (page, pageSize) => {
  const response = await axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

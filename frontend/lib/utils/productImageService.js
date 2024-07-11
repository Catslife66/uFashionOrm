import axios from "axios";

const API_URL = "/api/productimage";

const getProductImagesByProduct = async (product_slug) => {
  const response = await axios.get(`${API_URL}/product/${product_slug}`);
  return response.data;
};

const getSingleImage = async (imageId) => {
  const response = await axios.get(`${API_URL}/${imageId}`);
  return response.data;
};

const createProductImage = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/upload`, data, config);
  return response.data;
};

const updateProductImage = async (imageId, data) => {
  const response = await axios.put(`${API_URL}/${imageId}`, data);
  return response.data;
};

const deleteProductImage = async (imageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${imageId}`, config);
  return response.data;
};

const productImageService = {
  getProductImagesByProduct,
  getSingleImage,
  createProductImage,
  updateProductImage,
  deleteProductImage,
};

export default productImageService;

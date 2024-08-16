import axios from "axios";

const API_URL = "/api/productsize";

const getProductSize = async ({ prodId, size }) => {
  const params = new URLSearchParams();
  params.append("prodId", prodId);
  params.append("size", size);
  const response = await axios.get(`${API_URL}?${params.toString()}`);
  return response.data;
};

const getProductSizes = async (product_id) => {
  const response = await axios.get(`${API_URL}/${product_id}`);
  return response.data;
};

const getProductSizeBySize = async (prodId, size) => {
  const response = await axios.get(`${API_URL}/${prodId}/${size}`);
  return response.data;
};

const createProductSize = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

const updateProductSize = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, data, config);
  return response.data;
};

const productSizeService = {
  getProductSize,
  getProductSizes,
  getProductSizeBySize,
  createProductSize,
  updateProductSize,
};

export default productSizeService;

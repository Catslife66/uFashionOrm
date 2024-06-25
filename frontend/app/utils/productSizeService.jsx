import axios from "axios";

const API_URL = "/api/productsize";

const getProductSizes = async (product_id) => {
  const response = await axios.get(`${API_URL}/${product_id}`);
  return response.data;
};

const getProductSizeBySize = async (product_id, size) => {
  const response = await axios.get(`${API_URL}/${product_id}/${size}`);
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
  getProductSizes,
  getProductSizeBySize,
  createProductSize,
  updateProductSize,
};

export default productSizeService;

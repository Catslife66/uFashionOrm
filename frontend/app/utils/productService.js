import axios from "axios";

const API_URL = "/api/products";

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getSingleProduct = async (slug) => {
  const response = await axios.get(`${API_URL}/${slug}`);
  return response.data;
};

const searchProducts = async (query) => {
  const response = await axios.get(`${API_URL}/search?query=${query}`);
  return response.data;
};

const createProduct = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

const updateProduct = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, data, config);
  return response.data;
};

const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  getSingleProduct,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;

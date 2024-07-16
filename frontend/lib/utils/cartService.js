import axios from "axios";

const API_URL = "/api/cart";

// add item to cart (updateCart controller)
const addtoCart = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

const getMyCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`${API_URL}/mycart`, config);
  return response.data;
};

const updateItemQty = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(`${API_URL}/update`, data, config);
  return response.data;
};

const removeCartItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/item/${id}`, config);
  return response.data;
};

const cartService = {
  addtoCart,
  getMyCart,
  updateItemQty,
  removeCartItem,
};

export default cartService;

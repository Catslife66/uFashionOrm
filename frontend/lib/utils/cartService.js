import axios from "axios";

const API_URL = "/api/cart";

// add item to cart
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

const cartService = {
  addtoCart,
  getMyCart,
};

export default cartService;

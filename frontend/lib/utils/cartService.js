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

const getLocalStorageCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const addToLocalStorageCart = async (data) => {
  let cart = getLocalStorageCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === data.productId && item.size === data.size
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += data.quantity;
  } else {
    cart.push(data);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

const updateToLocalStorageCart = async (data) => {
  let cart = getLocalStorageCart();
  const updatedCart = cart.map((item) => {
    if (item.productId === data.productId && item.size === data.size) {
      return { ...item, quantity: data.quantity };
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));
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

const removeLocalCartItem = (data) => {
  const cart = getLocalStorageCart();
  const updatedCart = cart.filter(
    (item) => !(item.productId === data.productId && item.size === data.size)
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

const setCartCount = () => {
  const items = getLocalStorageCart();
  let count = items.reduce((total, item) => total + item.quantity, 0);
  localStorage.setItem("cartCount", count);
  window.dispatchEvent(new Event("storage"));
};

const clearLocalStorageCart = () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartCount");
};

const cartService = {
  addtoCart,
  getMyCart,
  updateItemQty,
  removeCartItem,
  addToLocalStorageCart,
  getLocalStorageCart,
  updateToLocalStorageCart,
  removeLocalCartItem,
  setCartCount,
  clearLocalStorageCart,
};

export default cartService;

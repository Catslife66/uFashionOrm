import axios from "axios";

const API_URL = "/api/users";

const login = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const loginAdmin = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/admin/login`, {
    email,
    password,
  });
  return response.data;
};

const register = async ({ username, email, password }) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

const checkLoginStatus = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/verify`, config);

  return response.data;
};

const getMyShippingAddress = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/shipping-addresses/my`, config);

  return response.data;
};

const createUserShippingAddress = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/shipping-addresses`,
    data,
    config
  );

  return response.data;
};

const deleteUserShippingAddress = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`${API_URL}/shipping-addresses/${id}`, config);
  return res.data;
};

const createUserWishList = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(`${API_URL}/wishlist/my`, data, config);
  return res.data;
};

const deleteUserWishList = async (prodSizeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const params = new URLSearchParams();
  params.append("prodSizeId", prodSizeId);
  const res = await axios.delete(
    `${API_URL}/wishlist?${params.toString()}`,
    config
  );
  return res.data;
};

const getUserWishList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/wishlist/my`, config);
  return res.data;
};

const checkProductIsLiked = async (prodSizeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(prodSizeId);
  const params = new URLSearchParams();
  params.append("prodSizeId", prodSizeId);
  const res = await axios.get(
    `${API_URL}/wishlist?${params.toString()}`,
    config
  );
  return res.data;
};

const userService = {
  login,
  loginAdmin,
  register,
  checkLoginStatus,
  getMyShippingAddress,
  createUserShippingAddress,
  deleteUserShippingAddress,
  createUserWishList,
  deleteUserWishList,
  getUserWishList,
  checkProductIsLiked,
};

export default userService;

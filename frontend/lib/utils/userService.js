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

const userService = {
  login,
  loginAdmin,
  register,
  checkLoginStatus,
  getMyShippingAddress,
  createUserShippingAddress,
};

export default userService;

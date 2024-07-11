import axios from "axios";

const API_URL = "/api/users/";

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

const userService = {
  login,
  loginAdmin,
  register,
};

export default userService;

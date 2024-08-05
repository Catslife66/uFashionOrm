import axios from "axios";

const BASE_URL = "http://localhost:4000";
const API_URL = "/api/orders";

const getOrders = async () => {
  const res = await fetch(`${BASE_URL}${API_URL}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getSingleOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/${id}`, config);
  return res.data;
};

const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/my`, config);
  return res.data;
};

const initiateOrder = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, data, config);
  return res.data;
};

const orderService = {
  getOrders,
  getSingleOrder,
  getMyOrders,
  initiateOrder,
};

export default orderService;

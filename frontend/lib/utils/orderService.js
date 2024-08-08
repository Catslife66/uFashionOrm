import axios from "axios";

const API_URL = "/api/orders";

const getOrders = async (status = "all", duration = "all", token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(
    `${API_URL}/all?status=${status}&duration=${duration}`,
    config
  );
  return res.data;
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

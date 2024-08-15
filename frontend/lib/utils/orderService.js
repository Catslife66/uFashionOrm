import axios from "axios";

const API_URL = "/api/orders";
const ORDERITEM_API_URL = "/api/orderitems";

const getOrders = async ({
  page = 1,
  limit = 10,
  status = "all",
  duration = "all",
  token,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);
  params.append("status", status);
  params.append("duration", duration);

  const res = await axios.get(`${API_URL}?${params.toString()}`, config);
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

const initiateOrder = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, data, config);
  return res.data;
};

const getOrderItem = async (id) => {
  const res = await axios.get(`${ORDERITEM_API_URL}/search?id=${id}`);
  return res.data;
};

const orderService = {
  getOrders,
  getSingleOrder,
  initiateOrder,
  getOrderItem,
};

export default orderService;

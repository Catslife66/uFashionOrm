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

const getSingleOrder = async (id) => {
  const res = await fetch(`${BASE_URL}${API_URL}/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getMyOrders = async () => {
  const res = await fetch(`${BASE_URL}${API_URL}/my`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const orderService = {
  getOrders,
  getSingleOrder,
  getMyOrders,
};

export default orderService;

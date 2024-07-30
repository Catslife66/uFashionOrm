import axios from "axios";

const API_URL = "/api/payment";

const createPaymentSession = async (data) => {
  const res = await axios.post(`${API_URL}/create-checkout-session`, data);
  return res.data;
};

const paymentSuccess = async (session_id) => {
  const res = await axios.get(`${API_URL}/success?session_id=${session_id}`);
  return res.data;
};

const paymentService = {
  createPaymentSession,
  paymentSuccess,
};

export default paymentService;

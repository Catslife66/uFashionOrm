import axios from "axios";

const API_URL = "/api/reviews";

const getProductReviews = async ({ id, page = 1, limit = 2 }) => {
  const params = new URLSearchParams();
  params.append("id", id);
  params.append("page", page);
  params.append("limit", limit);
  const res = await axios.get(`${API_URL}/product?${params.toString()}`);
  return res.data;
};

const filterProductReviews = async ({ prodId, rating }) => {
  const params = new URLSearchParams();
  params.append("prodId", prodId);
  params.append("rating", rating);
  const res = await axios.get(`${API_URL}/filter?${params.toString()}`);
  return res.data;
};

const createReview = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, data, config);
  return res.data;
};

const reviewService = {
  getProductReviews,
  filterProductReviews,
  createReview,
};

export default reviewService;

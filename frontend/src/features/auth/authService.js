import axios from "axios";

const API_USER = "/api/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_USER, userData);

  if (response?.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response?.data;
};

const authService = {
  register,
};

export default authService;

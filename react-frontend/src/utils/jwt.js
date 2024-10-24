import { jwtDecode } from "jwt-decode";

export const decodeJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return "Error decoding token:", error.message;
  }
};

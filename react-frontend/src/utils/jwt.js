import { jwtDecode } from "jwt-decode";

export const decodeJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return "Error decoding token:", error.message;
  }
};

export const validateToken = async () => {
  const isValid = await checkValidJWT();
  return isValid;
};

export const checkValidJWT = async () => {
  const currentPath = sessionStorage.getItem("currentPath");

  try {
    const response = await fetch(`${currentPath}/token/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: sessionStorage.getItem("token"),
      }),
    });

    if (!response.ok) {
      // console.log("Token was invalid!");
      return false;
    }

    // console.log("Token was valid!");
    return true;
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

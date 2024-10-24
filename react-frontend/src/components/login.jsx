import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorVisible, setErrorVisible] = useState(false);

  const navigate = useNavigate();
  const currentPath =
    process.env.NODE_ENV === "production"
      ? "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net"
      : "http://localhost:1337";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${currentPath}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const json = await response.json();

      if (json.message === "Wrong email or password") {
        setErrorVisible(true);
      } else {
        sessionStorage.setItem("token", json.token);
        alert("Login successful!");
        setErrorVisible(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="document-bg">
      {errorVisible && (
        <div className="error-popup">
          <p>Wrong username or password.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="new-doc">
        <label htmlFor="title">Användarnamn</label>
        <input
          type="text"
          id="username"
          name="username"
          className="title-input"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="title">Lösenord</label>
        <input
          type="password"
          id="password"
          name="password"
          className="title-input"
          value={formData.password}
          onChange={handleChange}
        />
        <input className="button-create" type="submit" value="Logga in" />
      </form>
      <div className="account-link-container">
        <Link className="account-link" to="/user/create">
          Need an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;

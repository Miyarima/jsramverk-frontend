import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function LoginCollaborator() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorVisible, setErrorVisible] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const currentPath = sessionStorage.getItem("currentPath");

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
      const response = await fetch(`${currentPath}/users/collaboration/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
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

export default LoginCollaborator;

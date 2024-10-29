import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateUserCollaborator() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      const response = await fetch(`${currentPath}/users/collaboration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="document-bg">
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

        <label htmlFor="title">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="title-input"
          value={formData.email}
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

        <input className="button-create" type="submit" value="Skapa Konto" />
      </form>
    </div>
  );
}

export default CreateUserCollaborator;

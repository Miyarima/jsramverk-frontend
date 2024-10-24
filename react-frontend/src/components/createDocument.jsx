import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJWT } from "../utils/jwt";

function CreateDocument() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

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
      const token = sessionStorage.getItem("token");
      const decodedToken = decodeJWT(token);

      const response = await fetch(`${currentPath}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token"),
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation { addDocument(title: "${formData.title}", content: "${formData.content}", creator: "${decodedToken.username}") { title } }`,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="document-bg">
      <form onSubmit={handleSubmit} className="new-doc">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="title-input"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="content">Innehåll</label>
        <textarea
          id="content"
          name="content"
          className="content-input input-width"
          value={formData.content}
          onChange={handleChange}
        />

        <input className="button-create" type="submit" value="Skapa" />
      </form>
    </div>
  );
}

export default CreateDocument;

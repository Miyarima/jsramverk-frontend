import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidJWT } from "../../utils/jwt";
import { query } from "../../utils/query";

function CreateDocument() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkValidJWT();
      if (!isValid) {
        navigate("/user/login");
      }
    };

    validateToken();
  }, []);

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
      const response = await query.addGraphql(
        formData.title,
        formData.content,
        "no"
      );

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

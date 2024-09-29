import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Document() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net/docs/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error has occured");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          title: data.data.title || "",
          content: data.data.content || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

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
      const response = await fetch(
        `https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net/docs/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            ...formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      navigate("/~jogo19/editor/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit} className="new-doc">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input type="hidden" name="id" value={id} />

        <label htmlFor="content">Innehåll</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />

        <input type="submit" value="Uppdatera" />
      </form>
    </div>
  );
}

export default Document;

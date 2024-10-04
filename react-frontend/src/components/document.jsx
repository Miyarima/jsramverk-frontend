import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Document() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  // const currentPath =
  //   process.env.NODE_ENV === "production"
  //     ? "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net"
  //     : "http://localhost:1337";
  const currentPath =
    "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net";
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(currentPath);
    socketRef.current.emit("create", id);

    socketRef.current.on("serverUpdate", (data) => {
      console.log("serverUpdate:", data);
      setFormData({
        title: data.title,
        content: data.content,
      });
    });

    fetch(`${currentPath}/docs/${id}`)
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

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    socketRef.current.emit("update", {
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${currentPath}/docs/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          ...formData,
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

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="document-bg">
      <form onSubmit={handleSubmit} className="new-doc">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="title-input"
          value={formData.title}
          onChange={handleChange}
        />

        <input type="hidden" name="id" value={id} />

        <label htmlFor="content">Innehåll</label>
        <textarea
          name="content"
          className="content-input"
          value={formData.content}
          onChange={handleChange}
        />

        <input className="button-create" type="submit" value="Uppdatera" />
      </form>
    </div>
  );
}

export default Document;

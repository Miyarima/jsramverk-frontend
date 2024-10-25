import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import AddComment from "./comment";
import AddCollaborator from "./inviteUser";
import { checkValidJWT } from "../utils/jwt";

function Document() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [caretPosition, setCaretPosition] = useState({ caret: 0, line: 0 });
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const currentPath =
    process.env.NODE_ENV === "production"
      ? "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net"
      : "http://localhost:1337";

  const socketRef = useRef(null);

  const handelSocketUpdate = (update, data) => {
    const path = update === "socketJoin" ? data.content : data;

    setFormData({
      title: path.title,
      content: path.content,
    });
  };

  const handelSocketComment = (data) => {
    if (data.comment) {
      setComments((prevComments) => [
        ...prevComments,
        {
          comment: data.comment,
          caret: data.caretPosition.caret,
          row: data.caretPosition.line,
        },
      ]);
    } else {
      setComments((prevComments) => [...prevComments, ...data]);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkValidJWT();
      if (!isValid) {
        navigate("user/login");
      }
    };

    validateToken();

    socketRef.current = io(currentPath);
    socketRef.current.emit("create", id);

    socketRef.current.on("serverUpdate", (data) =>
      handelSocketUpdate("serverUpdate", data)
    );

    socketRef.current.on("socketJoin", (data) =>
      handelSocketUpdate("socketJoin", data)
    );

    socketRef.current.on("newComment", (data) => {
      handelSocketComment(data);
    });

    fetch(`${currentPath}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token"),
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{ document(id: "${id}") { title, content } }`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error has occured");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          title: data.data.document.title || "",
          content: data.data.document.content || "",
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
      const response = await fetch(`${currentPath}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation { updateDocument(id: "${id}", title: "${formData.title}", content: "${formData.content}") { id } }`,
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

  const handleCarotMove = (e) => {
    const value = e.target.value;
    const caretPosition = e.target.selectionStart;
    const lineNumber = value.substring(0, caretPosition).split("\n").length;

    const caretPositionInLine =
      lineNumber === 1
        ? caretPosition
        : caretPosition - (value.lastIndexOf("\n", caretPosition - 1) + 1);

    setCaretPosition({ caret: caretPositionInLine, line: lineNumber });
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
      <div className="modal-container">
        <AddComment
          caretPosition={caretPosition}
          socketRef={socketRef}
          newComment={handelSocketComment}
        />
        <AddCollaborator
          socketRef={socketRef}
          documentId={id}
          currentPath={currentPath}
        />
      </div>
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
          className="content-input input-width"
          value={formData.content}
          onChange={handleChange}
          onClick={handleCarotMove}
        />

        <input className="button-create" type="submit" value="Uppdatera" />
      </form>
      <div>
        {comments.map((comments, index) => (
          <div className="comment" key={index}>
            <h3>
              Rad {comments.row} | char {comments.caret}
            </h3>
            <p>{comments.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Document;

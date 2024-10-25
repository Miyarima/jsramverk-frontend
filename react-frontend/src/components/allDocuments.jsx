import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeJWT, checkValidJWT } from "../utils/jwt";

function AllDocuments() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentPath =
    process.env.NODE_ENV === "production"
      ? "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net"
      : "http://localhost:1337";

  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkValidJWT();
      if (!isValid) {
        navigate("user/login");
      }
    };

    validateToken();

    const token = sessionStorage.getItem("token");
    const decodedToken = decodeJWT(token);
    fetch(`${currentPath}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token"),
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{ documents(creator: "${decodedToken.username}") { _id, title } }`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error has occured");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="docs-container">
      {data.data.documents.map((item) => (
        <Link className="doc-link" to={`document/${item._id}`} key={item._id}>
          <div>
            <div className="doc"></div>
            <h3>{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllDocuments;

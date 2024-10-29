import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkValidJWT } from "../../utils/jwt";
import { query } from "../../utils/query";

function AllDocuments() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkValidJWT();
      if (!isValid) {
        navigate("/user/login");
      }
    };

    validateToken();

    const getDocs = async () => {
      try {
        const response = await query.getDocumentsGraphql();

        if (!response.ok) {
          throw new Error("An Error has occured");
        }

        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    getDocs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="docs-layout">
      <h3>Text</h3>
      <div className="docs-container">
        {data.data.documents
          .filter((item) => item.code === "no")
          .map((item) => (
            <Link
              className="doc-link"
              to={`document/${item._id}`}
              key={item._id}
            >
              <div>
                <div className="doc"></div>
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
      </div>
      <h3>Code</h3>
      <div className="docs-container">
        {data.data.documents
          .filter((item) => item.code === "yes")
          .map((item) => (
            <Link
              className="doc-link"
              to={`codemode/${item._id}`}
              key={item._id}
            >
              <div>
                <div className="doc"></div>
                <h3>{item.content}</h3>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default AllDocuments;

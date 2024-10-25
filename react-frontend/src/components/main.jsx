import React from "react";
import { Link } from "react-router-dom";
import AllDocuments from "./allDocuments.jsx";

function Main() {
  return (
    <div className="main">
      <div className="title-bar">
        <h2>Dokument</h2>
        <div className="title-bar-buttons">
          <Link className="button" to="document/create">
            Create Document
          </Link>
          <Link className="button" to="codemode">
            Code Mode
          </Link>
        </div>
      </div>
      <AllDocuments />
    </div>
  );
}

export default Main;

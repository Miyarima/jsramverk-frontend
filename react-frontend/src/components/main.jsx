import React from "react";
import { Link } from "react-router-dom";
import AllDocuments from "./documents";

function Main() {
  return (
    <div className="main">
      <div className="title-bar">
        <h2>Dokument</h2>
        <Link className="button" to="document/create">
          Create Document
        </Link>
      </div>
      <AllDocuments />
    </div>
  );
}

export default Main;

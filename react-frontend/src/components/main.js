import { Link } from "react-router-dom";
import AllDocuments from "./documents";
// import { Routes, Route } from "react-router-dom";

function Main() {
  return (
    <div class="main">
      <div class="title-bar">
        <h2>Dokument</h2>
        <Link class="button" to="document/create">
          Create Document
        </Link>
      </div>
      <AllDocuments />
    </div>
  );
}

export default Main;

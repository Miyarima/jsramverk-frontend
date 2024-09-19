import AllDocuments from "./documents";
// import { Routes, Route } from "react-router-dom";

function Main() {
  return (
    <div class="main">
      <div class="title-bar">
        <h2>Dokument</h2>
        <a class="button" href="/create">
          Create Document
        </a>
      </div>
      <AllDocuments />
    </div>
  );
}

export default Main;

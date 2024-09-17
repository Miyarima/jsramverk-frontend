import AllDocuments from "./documents";

function Main(props) {
  return (
    <div class="main">
      <div class="title-bar">
        <h2>Dokument</h2>
        <a class="button" href="/create">
          Create Document
        </a>
      </div>
      <div class="docs-container">
        <AllDocuments />
      </div>
    </div>
  );
}

export default Main;

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
        <a class="doc-link" href="/<%= doc.id %>">
          <div>
            <div class="doc"></div>
            <h3>Title</h3>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Main;

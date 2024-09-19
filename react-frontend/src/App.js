// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import Document from "./components/document";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const authors = "Jonathan & Zein";

function App() {
  return (
    <Router>
      <div class="body">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/document/:id" element={<Document />} />
        </Routes>
        <Footer authors={authors} />
      </div>
    </Router>
  );
}

export default App;

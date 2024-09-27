// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import Document from "./components/document";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateDocument from "./components/createDocument";

const authors = "Jonathan & Zein";

function App() {
  return (
    <Router>
      <div className="body">
        <Header />
        <Routes>
          <Route path="~jogo19/editor/" element={<Main />} />
          <Route
            path="~jogo19/editor/document/create"
            element={<CreateDocument />}
          />
          <Route path="~jogo19/editor/document/:id" element={<Document />} />
        </Routes>
        <Footer authors={authors} />
      </div>
    </Router>
  );
}

export default App;

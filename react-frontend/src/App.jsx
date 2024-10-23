import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import Document from "./components/document";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateDocument from "./components/createDocument";
import CreateUser from "./components/createUser";
import Login from "./components/login";

const authors = "Jonathan";
const basename = process.env.NODE_ENV === "production" ? "~jogo19/editor" : "/";

function App() {
  return (
    <Router basename={basename}>
      <div className="body">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/document/create" element={<CreateDocument />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
        <Footer authors={authors} />
      </div>
    </Router>
  );
}

export default App;

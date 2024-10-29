import "./App.css";
import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
import Main from "./components/main";
import Document from "./components/documents/document";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateDocument from "./components/documents/createDocument";
import CreateUser from "./components/users/createUser";
import Login from "./components/users/login";
import CreateUserCollaborator from "./components/users/createUserCollaborator";
import LoginCollaborator from "./components/users/loginCollaborator";
import CodeMode from "./components/code/codeMode";
import CreateCodeMode from "./components/code/createCodeMode";

const authors = "Jonathan";
const basename = process.env.NODE_ENV === "production" ? "~jogo19/editor" : "/";
const currentPath =
  process.env.NODE_ENV === "production"
    ? "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net"
    : "http://localhost:1337";

sessionStorage.setItem("currentPath", currentPath);

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
          <Route
            path="/user/login/collaboration/:id"
            element={<LoginCollaborator />}
          />
          <Route
            path="/user/create/collaboration/:id"
            element={<CreateUserCollaborator />}
          />
          <Route path="/codemode" element={<CreateCodeMode />} />
          <Route path="/codemode/:id" element={<CodeMode />} />
        </Routes>
        <Footer authors={authors} />
      </div>
    </Router>
  );
}

export default App;

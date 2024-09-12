// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React Today
//         </a>
//       </header>
//     </div>
//   );
// }

const authors = "Jonathan & Zein";

function App() {
  return (
    <div class="body">
      <Header />
      <Main />
      <Footer authors={authors} />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeMode() {
  const [value, setValue] = useState("console.log('hello world!');");
  const [result, setResult] = useState("");

  const currentPath =
    process.env.NODE_ENV === "production"
      ? "https://dida-jogo19-dv1677-h24-lp1-aga5c6ctgsc5h3fj.northeurope-01.azurewebsites.net"
      : "http://localhost:1337";

  const onChange = (val) => {
    setValue(val);
  };

  const handleButtonClick = async () => {
    fetch(`${currentPath}/users/codemode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        code: value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error has occured");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResult(data.res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="execute-container">
        <button
          className="modal-comment-button execute-button"
          onClick={handleButtonClick}
        >
          Exicvera kod
        </button>
      </div>
      <div className="code-container">
        <CodeMirror
          value={value}
          height="82vh"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          className="code-box"
        />
        <div className="code-box code-result">{result}</div>
      </div>
    </>
  );
}
export default CodeMode;

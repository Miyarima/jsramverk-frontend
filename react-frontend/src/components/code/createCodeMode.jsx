import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { checkValidJWT } from "../../utils/jwt";
import { javascript } from "@codemirror/lang-javascript";
import { query } from "../../utils/query";
import { code } from "../../utils/codeMode";

function CreateCodeMode() {
  const [value, setValue] = useState("console.log('hello world!');");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkValidJWT();
      if (!isValid) {
        navigate("/user/login");
      }
    };

    validateToken();
  }, []);

  const handleChange = (e) => {
    setValue(e);
  };

  const handleExecute = async () => {
    try {
      const response = await code.execute(value);

      if (!response.ok) {
        throw new Error("An Error has occured");
      }

      const res = await response.json();
      setResult(res.res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveDoc = async () => {
    await query.addGraphql("", value, "yes");
  };

  return (
    <>
      <div className="execute-container">
        <button
          className="modal-comment-button execute-button"
          onClick={handleExecute}
        >
          Exekvera kod
        </button>
        <button
          className="modal-comment-button execute-button"
          onClick={handleSaveDoc}
        >
          Spara Kod
        </button>
      </div>
      <div className="code-container">
        <CodeMirror
          value={value}
          height="82vh"
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
          className="code-box"
        />
        <div className="code-box code-result">{result}</div>
      </div>
    </>
  );
}
export default CreateCodeMode;

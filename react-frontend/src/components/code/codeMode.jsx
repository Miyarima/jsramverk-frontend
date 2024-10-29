import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { checkValidJWT } from "../../utils/jwt";
import { javascript } from "@codemirror/lang-javascript";
import { code } from "../../utils/codeMode";

function CodeMode() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkValidJWT();
      if (!isValid) {
        navigate("/user/login");
      }
    };

    const setContent = async () => {
      const response = await code.getContent(id);
      const res = await response.json();
      setValue(res.data.content);
    };

    validateToken();
    setContent();
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
    await code.updateContent(id, value);
    navigate("/");
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

export default CodeMode;

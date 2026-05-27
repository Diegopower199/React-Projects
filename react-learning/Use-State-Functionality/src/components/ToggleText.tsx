import { useState } from "react";
import { Link } from "react-router-dom";

export const ToggleText = () => {
  const text =
    "Si haces click al botón, el texto se ocultará. Si vuelves a clicar, el texto se mostrará de nuevo.";
  const [visibleText, setVisibleText] = useState(true);

  const toggleText = () => {
    setVisibleText(!visibleText);
  };

  return (
    <>
      <h1>
        <Link to="/">Home</Link>
      </h1>

      <h1>Toggle Text</h1>
      {visibleText && <p>{text}</p>}
      <button onClick={toggleText}>{visibleText ? "Hide" : "Show"} Text</button>
    </>
  );
};

import { useState } from "react";
import Home from "./components /Home";
import Quiz from "./components /Quiz";
import Options from "./components /Options";

function App() {
  const [start, setStart] = useState(false);
  const handleStart = () => {
    setStart(!start);
  };
  return (
    <>
      {!start && <Home handleStart={handleStart} />}
      {start && <Options />}
    </>
  );
}

export default App;

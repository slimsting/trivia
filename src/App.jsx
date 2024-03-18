import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/Quiz/:data" element={<Quiz />} />
    </Routes>
  );
}

export default App;

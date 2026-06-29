import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Register } from "./components/Registrer";
import { Protected } from "./components/Protected";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />

      <Route path="/protected" element={<Protected />} />
    </Routes>
  );
}

export default App;

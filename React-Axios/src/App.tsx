import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { CharactersPage } from "./pages/characters";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/episodes" element={<h1>Episodes</h1>} />
      <Route path="/locations" element={<h1>Locations</h1>} />
    </Routes>
  );
}

export default App;

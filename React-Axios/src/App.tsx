import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { CharactersPage } from "./pages/charactersPage";
import { CharacterPage } from "./pages/characterPage";
import { LocationsPage } from "./pages/locationsPage";
import { LocationPage } from "./pages/locationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/characters/:id" element={<CharacterPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/locations/:id" element={<LocationPage />} />
    </Routes>
  );
}

export default App;

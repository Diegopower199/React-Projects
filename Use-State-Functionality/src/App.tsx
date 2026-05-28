import { Routes, Route } from "react-router-dom";
import { NavLinks } from "./components/NavLinks";
import { CounterPage } from "./pages/counter";
import { TodoListPage } from "./pages/todolist";
import { SearchFilmFilterPage } from "./pages/search-film-filter";
import { ToggleTextPage } from "./pages/toggletext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavLinks />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/search-film-filter" element={<SearchFilmFilterPage />} />
      <Route path="/todo-list" element={<TodoListPage />} />
      <Route path="/toggle-text" element={<ToggleTextPage />} />
    </Routes>
  );
}

export default App;

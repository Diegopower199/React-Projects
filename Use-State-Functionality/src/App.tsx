import { Routes, Route } from "react-router-dom";
import { Counter } from "./components/Counter";
import { NavLinks } from "./components/NavLinks";
import { SearchFilmFilter } from "./components/SearchFilmFilter";
import { TodoList } from "./components/TodoList";
import { ToggleText } from "./components/ToggleText";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavLinks />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/search-film-filter" element={<SearchFilmFilter />} />
      <Route path="/todo-list" element={<TodoList />} />
      <Route path="/toggle-text" element={<ToggleText />} />
    </Routes>
  );
}

export default App;

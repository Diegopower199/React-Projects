import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Counter } from "./Counter";
import { SearchFilmFilter } from "./SearchFilmFilter";
import { TodoList } from "./TodoList";
import { ToggleText } from "./ToggleText";

export const BrowserLinks = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>My App</h1>
                <h1>
                  <Link to="/counter">Counter</Link>
                </h1>

                <h1>
                  <Link to="/search-film-filter">Search Film Filter</Link>
                </h1>

                <h1>
                  <Link to="/todo-list">Todo List</Link>
                </h1>

                <h1>
                  <Link to="/toggle-text">Toggle Text</Link>
                </h1>
              </>
            }
          />

          <Route path="/counter" element={<Counter />} />
          <Route path="/search-film-filter" element={<SearchFilmFilter />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/toggle-text" element={<ToggleText />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

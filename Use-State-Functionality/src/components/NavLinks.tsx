import { Link } from "react-router-dom";

export const NavLinks = () => {
  return (
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
  );
};

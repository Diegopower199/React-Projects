import { useState } from "react";
import { Link } from "react-router-dom";

const FILMS = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "Forrest Gump",
  "Inception",
  "Fight Club",
  "The Matrix",
  "Goodfellas",
];

export const SearchFilmFilter = () => {
  const [searchFilm, setSearchFilm] = useState("");

  const handleSearchFilm = (e) => {
    setSearchFilm(e.target.value);
  };

  return (
    <>
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <h1>Search Film Filter</h1>
      <input
        type="text"
        placeholder="Search for a film..."
        value={searchFilm}
        onChange={handleSearchFilm}
      />
      {FILMS.map((film) => {
        if (film.toLowerCase().includes(searchFilm.toLowerCase())) {
          return <p key={film}>{film}</p>;
        }
        return null;
      })}
    </>
  );
};

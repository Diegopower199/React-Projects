import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Characters.css";
import { GET_CHARACTERS } from "../../services/querys";

export const Characters = () => {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <>
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
        <h1>Error fetching characters</h1>
      </>
    );
  }

  const characters = data?.characters?.results ?? [];
  const info = data?.characters?.info;

  return (
    <div className="characters-page">
      <div className="back-home-container">
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
      </div>

      <div className="characters-container">
        {characters.map((character) => (
          <Link
            key={character.id}
            to={`/characters/${character.id}`}
            className="character-link"
          >
            <div className="character-card">
              <h2 className="character-title">{character.name}</h2>

              <p className="character-status">{character.status}</p>

              <img
                className="character-image"
                src={character.image}
                alt={character.name}
              />
            </div>
          </Link>
        ))}
      </div>

      {info && (
        <div className="pagination-container">
          <p className="pagination-info">
            Page {page} of {info.pages}
          </p>

          <div className="pagination-buttons">
            {info.prev && (
              <button
                className="pagination-button"
                onClick={() => setPage(info.prev)}
              >
                Back
              </button>
            )}

            {info.next && (
              <button
                className="pagination-button"
                onClick={() => setPage(info.next)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import "./Characters.css";
import { Link } from "react-router-dom";
import {
  getAllCharacters,
  getCharactersByPage,
} from "../../services/characters";

interface Info {
  next?: string;
  prev?: string;
  pages?: number;
}

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getAllCharactersAndHandleErrors = async () => {
    try {
      const responseGetAllCharacters = await getAllCharacters();
      console.log(responseGetAllCharacters);
      setCharacters(responseGetAllCharacters.results);
      setInfo(responseGetAllCharacters.info);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching characters");
    }
  };

  const nextPage = async () => {
    if (!info.next) return;

    try {
      const nextPageNumber = Number(info.next.split("page=")[1]);

      const response = await getCharactersByPage(nextPageNumber);

      setCharacters(response.results);
      setInfo(response.info);
    } catch (error) {
      setErrorMessage("Error fetching next page of characters");
    }
  };

  const backPage = async () => {
    if (!info.prev) return;

    try {
      const prevPageNumber = Number(info.prev.split("page=")[1]);

      const response = await getCharactersByPage(prevPageNumber);

      setCharacters(response.results);
      setInfo(response.info);
    } catch (error) {
      setErrorMessage("Error fetching back page of characters");
    }
  };

  useEffect(() => {
    getAllCharactersAndHandleErrors();
  }, []);

  return (
    <div className="characters-page">
      <div className="back-home-container">
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
            {`Page ${
              info.prev ? Number(info.prev.split("page=")[1]) + 1 : 1
            } of ${info.pages}`}
          </p>

          <div className="pagination-buttons">
            {info.prev && (
              <button className="pagination-button" onClick={backPage}>
                Back
              </button>
            )}

            {info.next && (
              <button className="pagination-button" onClick={nextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Character.css";
import { getCharacterById } from "../../services/characters";

export const Character = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);

  const getCharacterAndHandleErrors = async () => {
    try {
      const response = await getCharacterById(`${id}`);

      setCharacter(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacterAndHandleErrors();
  }, []);

  if (!character) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="character-page">
      <div className="back-container">
        <Link className="back-link" to="/characters">
          ← Back to characters
        </Link>
      </div>

      <div className="character-content">
        <h1>{character.name}</h1>

        <p>Status: {character.status}</p>

        <p>Species: {character.species}</p>

        <img src={character.image} alt={character.name} />
      </div>
    </div>
  );
};

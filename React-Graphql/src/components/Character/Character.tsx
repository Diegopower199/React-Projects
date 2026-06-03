import { Link, useParams } from "react-router-dom";
import "./Character.css";
import type { CharacterType } from "../../interfaces/character";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER } from "../../services/querys";

interface CharacterData {
  character: CharacterType;
}

interface CharacterVariables {
  id: string;
}

export const Character = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<CharacterData, CharacterVariables>(
    GET_CHARACTER,
    {
      variables: {
        id: id ?? "",
      },
      skip: !id,
    },
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading character</h1>;
  }

  if (!data?.character) {
    return <h1>Character not found</h1>;
  }

  const character = data.character;

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

        <p>Gender: {character.gender}</p>

        <p>Origin: {character.origin?.name}</p>

        <p>Location: {character.location?.name}</p>

        <img src={character.image} alt={character.name} />
      </div>
    </div>
  );
};

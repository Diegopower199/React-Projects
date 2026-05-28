import { useEffect, useState } from "react";
import { getAllCharacters } from "../services/Characters";

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  const [error, setError] = useState(null);

  const fetchGetAllCharactersAndHandleErrors = async () => {
    try {
      const responseGetAllCharacters = await getAllCharacters();

      setCharacters(responseGetAllCharacters.data);
      setInfo(responseGetAllCharacters.info);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchGetAllCharactersAndHandleErrors();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {characters.map((character) => (
        <div
          key={character.id}
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "15px",
            textAlign: "center",
          }}
        >
          <h2>{character.name}</h2>

          <p>{character.status}</p>

          <img
            src={character.image}
            alt={character.name}
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

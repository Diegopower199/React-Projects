import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <>
        <h1>My App</h1>

        <h1>
          <Link to="/characters">Characters</Link>
        </h1>

        <h1>
          <Link to="/locations">Locations</Link>
        </h1>
      </>
    </>
  );
};

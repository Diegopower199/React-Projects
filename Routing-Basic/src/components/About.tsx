import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <h1>About Page</h1>

      <Link to="/">
        <button>Volver Home</button>
      </Link>
    </>
  );
};

import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>Home</h1>

      <Link to="/about">
        <button>Ir a About</button>
      </Link>

      <br />
      <br />

      <Link to="/contact">
        <button>Ir a Contact</button>
      </Link>
    </>
  );
};

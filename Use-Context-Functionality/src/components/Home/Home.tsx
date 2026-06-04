import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <>
        <h1>My App</h1>

        <h1>
          <Link to="/login">Login</Link>
        </h1>
      </>
    </>
  );
};

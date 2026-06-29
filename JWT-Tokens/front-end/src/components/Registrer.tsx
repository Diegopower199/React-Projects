import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <h1>Register</h1>

      <Link to="/">
        <button>Ir a Login</button>
      </Link>
    </>
  );
};

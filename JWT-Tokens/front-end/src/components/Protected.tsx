import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { logoutUser } from "../services/user";

export const Protected = () => {
  const { infoUser, setInfoUser, setIsLogged, isLoading } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser();

      setInfoUser(null);
      setIsLogged(false);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!infoUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Página de Protected</h1>

      <h2>Bienvenido {infoUser.username}</h2>

      <Link to="/">
        <button onClick={logout}>Cerrar Sesión</button>
      </Link>
    </>
  );
};

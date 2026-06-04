import { useEffect } from "react";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const MenuPrincipal = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  return (
    <div>
      <h1>Menu Principal</h1>
      <p>Bienvenido, {authUser?.name}!</p>
      <p>Email: {authUser?.email}!</p>
      <p>DNI: {authUser?.dni}!</p>
      <p>Fecha de Nacimiento: {authUser?.fechaNacimiento}!</p>
    </div>
  );
};

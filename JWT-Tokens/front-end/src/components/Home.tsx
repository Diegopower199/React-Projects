import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import { loginUser } from "../services/user";

export const Home = () => {
  const { infoUser, setInfoUser, isLogged, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!isLoading && isLogged) {
      navigate("/protected");
    }
  }, [isLoading, isLogged, navigate]);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ formData });

      setInfoUser({
        username: response.data.username,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }

    navigate("/protected");
  };

  return (
    <>
      <Link to="/register">
        <button>Ir a Register</button>
      </Link>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const infoUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  dni: "12345678A",
  fechaNacimiento: "1990-01-01",
};

export const Login = () => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    if (!formData.username) {
      errorMissingFields.username = "Por favor, ingresa un nombre de usuario";
    }

    if (!formData.password) {
      errorMissingFields.password = "Por favor, ingresa una contraseña";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    console.log("errorMissingFields", errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) {
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios ",
      );

      return;
    }

    if (formData.username === "admin" && formData.password === "admin") {
      setAuthUser({
        name: formData.username,
        password: formData.password,
        email: infoUser.email,
        dni: infoUser.dni,
        fechaNacimiento: infoUser.fechaNacimiento,
      });

      setErrorMessage("");
      navigate("/menu-principal");
    } else {
      setErrorMessage("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <div>
      <Link to="/">Go Back</Link>
      <h1>LoginPage</h1>
      <input
        type="username"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleFormChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleFormChange}
      />
      <button onClick={handleSubmit}>Login</button>
      {(errorMessage.length !== 0 ||
        Object.keys(requiredFieldsIncomplete).length !== 0) && (
        <div>
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

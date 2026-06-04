import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { MenuPrincipalPage } from "./pages/menu-principal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/menu-principal" element={<MenuPrincipalPage />} />
      </Routes>
    </>
  );
}

export default App;

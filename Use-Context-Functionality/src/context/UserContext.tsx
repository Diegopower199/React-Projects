import React, { useContext, useState } from "react";

// Creación del contexto de autenticación.
// Aquí se almacenarán los datos compartidos relacionados con el usuario.
const AuthContext = React.createContext({});

/**
 * Hook personalizado para acceder fácilmente al contexto.
 *
 * En lugar de escribir:
 * const auth = useContext(AuthContext);
 *
 * podemos escribir:
 * const auth = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Componente Provider.
 *
 * Es el encargado de almacenar el estado global de autenticación
 * y ponerlo a disposición de todos los componentes hijos.
 */
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

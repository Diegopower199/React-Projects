import React, { useContext, useEffect, useState } from "react";
import { checkSession } from "../services/user";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [infoUser, setInfoUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setInfoUser({
            id: user.id,
            username: user.username,
          });
          setIsLogged(true);
        } else {
          setInfoUser(null);
          setIsLogged(false);
        }
      } catch (error) {
        setInfoUser(null);
        setIsLogged(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        infoUser,
        setInfoUser,
        isLogged,
        setIsLogged,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useState, useEffect, useContext } from "react";
import Keycloak from "keycloak-js";

import keycloak from "../keycloak";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso", // or 'login-required'
        checkLoginIframe: false, // Disable iframe check if not needed
      })
      .then((auth) => {
        setKeycloakInstance(keycloak);
        setAuthenticated(auth);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Keycloak initialization failed", err);
        setLoading(false);
      });
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();
  const getToken = () => keycloak.token;

  return (
    <AuthContext.Provider
      value={{
        keycloakInstance,
        authenticated,
        loading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

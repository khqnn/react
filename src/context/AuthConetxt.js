// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import Keycloak from 'keycloak-js';

const AuthContext = createContext();

const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'frontend',
});

export const AuthProvider = ({ children }) => {

  console.log(process.env.REACT_APP_KEYCLOAK_ENABLED ?? false);
  

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(process.env.REACT_APP_KEYCLOAK_ENABLED ?? false);
  // const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(process.env.REACT_APP_KEYCLOAK_ENABLED ?? false){
      keycloak.init({  }).then((authenticated) => {
        setAuthenticated(authenticated);
        setLoading(false);
  
        if (authenticated) {
          setUser({
            username: keycloak.tokenParsed.preferred_username,
            email: keycloak.tokenParsed.email,
          });
        } else {
          setUser(null);
        }
      }).catch(() => {
        setLoading(false);
      })
    }
      
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  const isAuthenticated = () => {
    return keycloak.authenticated;
  }

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

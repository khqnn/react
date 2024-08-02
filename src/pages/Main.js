import React from "react";
import { useNavigate } from "react-router-dom";

import keycloak from "../keycloak";
import { useAuth } from "../context/AuthConetxt";

const Main = () => {
  const navigate = useNavigate();

  const { logout, login, authenticated } = useAuth();

  return (
    <div>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        {!authenticated && <li onClick={login}>Login</li>}
        {authenticated && <li onClick={logout}>Logout</li>}
      </ul>
    </div>
  );
};

export default Main;

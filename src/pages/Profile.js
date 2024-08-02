import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthConetxt";

const Profile = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  return <div>My Profile Details</div>;
};

export default Profile;

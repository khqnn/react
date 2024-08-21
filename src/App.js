import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthConetxt"; // Import useAuth hook

import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ element }) => {
  const { authenticated, login } = useAuth();
  
  if (authenticated) {
    return element;
  } else {
    login();
    return null;
  }
};

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

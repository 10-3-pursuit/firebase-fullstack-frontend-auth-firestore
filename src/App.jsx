import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import LandingPage from "./Components/LandingPage";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  async function handleLogout() {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  return (
    <>
      <NavBar handleLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

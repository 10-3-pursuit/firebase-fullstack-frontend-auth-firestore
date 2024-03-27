// src/components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

async function fetchUserProfile(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Returns the additional fields stored in Firestore
  } else {
    console.log("No such document!");
    return null;
  }
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState(null); // State to hold additional user info

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        const userProfile = await fetchUserProfile(user.uid);
        setProfile(userProfile); // Set the additional user info
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setProfile(null); // Clear the additional user info
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return { isAuthenticated, isLoading, user };
};

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user, profile } = useAuth();
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user, profile }} />; // If authenticated, continue rendering the component the route is pointing to
};

export default ProtectedRoute;

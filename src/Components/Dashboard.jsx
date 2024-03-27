import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const Dashboard = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null); // State to hold the fetched user profile
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  const fetchUserProfile = async (uid) => {
    const docRef = doc(db, "users", uid); // Adjust 'users' to your collection name

    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    if (docSnap.exists()) {
      setProfile(docSnap.data()); // Set the fetched profile in state
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("USER!!!!", user);
      fetchUserProfile(user.uid); // Fetch profile when component mounts and user is available
    }
  }, [user]); // Depend on user

  return (
    <div>
      <h1>Welcome, {profile && profile.username.toUpperCase()}</h1>
      <h3>This is a protected Component called Dashboard</h3>
      {/* Use user data as needed, for example: */}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

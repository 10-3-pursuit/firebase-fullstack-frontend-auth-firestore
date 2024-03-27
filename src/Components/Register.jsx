import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Ensure you import your Firestore instance

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const user = userCredential.user;
      // Now, store the additional information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: user.username,
        // Add other fields as needed
      });
      // Navigate to dashboard or show success message
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register");
    }
  }

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </label>
        <br />

        <label htmlFor="email">
          <input
            id="email"
            value={user.email}
            type="email"
            placeholder="email"
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [userReg, setUserReg] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleChange(event) {
    setUserReg({ ...userReg, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        userReg.email,
        userReg.password
      );

      // Now, store the additional information in Firestore, not required
      await setDoc(doc(db, "users", firebaseUser.user.uid), {
        username: userReg.username,
      });

      const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: firebaseUser.user.uid,
          email: userReg.email,
          username: userReg.username,
        }),
      });

      const newUser = await response.json();

      if (!response.ok) throw new Error("Failed to register user in backend");
      else {
        await setUser(newUser);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register");
    }
  }

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div style={{ marginTop: 100, textAlign: "center" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={userReg.username}
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
            value={userReg.email}
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
            value={userReg.password}
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

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { fetchUserInfo } from "./helpers/fetchUser";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });

  function handleChange(event) {
    setLoginUser({ ...loginUser, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function handleLogin(e, email, password) {
    e.preventDefault();

    try {
      const fireBaseUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo = await fetchUserInfo(fireBaseUser.user);

      await setUser(userInfo);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to log in");
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { email, password } = loginUser;
      await handleLogin(e, email, password);
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to log in");
    }
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { email: "demo@me.com", password: "password" };
    try {
      await handleLogin(e, user.email, user.password);
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to log in");
    }
  }

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    // remove this styling
    <div style={{ marginTop: 100, textAlign: "center" }}>
      <h2>Use the DemoUser button to login and save time during demo</h2>
      <h3> Remove the 'br' tags and these instructions if you use this code</h3>
      <button onClick={handleDemoSignIn}>Demo User</button>
      <br />
      <br />
      <br />
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            id="email"
            value={loginUser.email}
            type="email"
            placeholder="email"
            autoComplete="email"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            id="password"
            value={loginUser.password}
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
        No Account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;

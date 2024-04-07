import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to the Auth Starter</h1>
      <Link to="/login">Login</Link>
      <h2>If you are not logged in you cannot reach this route. Try!</h2>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default LandingPage;

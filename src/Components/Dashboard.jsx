import { useOutletContext } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext();

  return (
    <div
      // remove this styling
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome, {user && user.username.toUpperCase()}</h1>
      <h3>This is a ProtectedRoute Component called Dashboard</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

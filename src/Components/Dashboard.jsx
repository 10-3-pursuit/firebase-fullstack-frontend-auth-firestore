import { useOutletContext } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext();

  return (
    <div
      // remove this styling
      style={{ marginTop: 100, textAlign: "center" }}
    >
      <h1>Welcome, {user && user.username.toUpperCase()}</h1>
      <h3>This is a ProtectedRoute Component called Dashboard</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

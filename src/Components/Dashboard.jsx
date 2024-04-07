import { useOutletContext } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext();

  return (
    <div>
      <h1>Welcome, {user && user.username.toUpperCase()}</h1>
      <h3>This is a ProtectedRoute Component called Dashboard</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

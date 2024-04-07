import { Link } from "react-router-dom";

const Navbar = ({ handleLogout, user }) => {
  return (
    <div>
      <h1>Navbar Component</h1>
      <h2>
        {/* remove this styling */}
        <Link style={{ textDecoration: "none" }} to="/">
          Your image or Logo (click here to go to Landing Page)
        </Link>
      </h2>

      {!user ? (
        <Link to={"/login"}>
          <span>Login</span>
        </Link>
      ) : (
        <div>
          {user && <span>Hello, {user.username.toUpperCase()}? | </span>}
          <Link to="/login" onClick={handleLogout}>
            <span>Logout</span>
          </Link>
        </div>
      )}

      <span
        style={{
          color: "gray",
          cursor: "pointer",
          paddingLeft: 10,
          textDecoration: "underline",
        }}
        onClick={handleLogout}
      >
        Force Firebase Logout
      </span>
      <hr />
    </div>
  );
};

export default Navbar;

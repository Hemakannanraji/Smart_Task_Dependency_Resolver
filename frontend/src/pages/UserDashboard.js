import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function UserDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔐 Redirect if user logs out
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      
    }
  }, [user, navigate]);

  const handleLogout = () => {
    googleLogout();   // end Google session
    logout();         // clears user + localStorage
    // ❌ DO NOT navigate here
  };

  if (!user) return null; // prevents blank flicker

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 15px",
          backgroundColor: "#d9534f",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;

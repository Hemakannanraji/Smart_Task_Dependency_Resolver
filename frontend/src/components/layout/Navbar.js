import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ title }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                 // clear user from context
    navigate("/");            // redirect to login
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.title}>{title}</h2>
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#0061A2",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
  },
  title: {
    margin: 0,
  },
  logoutBtn: {
    backgroundColor: "white",
    color: "#0061A2",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;

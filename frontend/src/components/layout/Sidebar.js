import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <NavLink to="/dashboard" style={styles.link} activeclassname="active">
        Dashboard
      </NavLink>

      <NavLink to="/tasks" style={styles.link}>
        Tasks
      </NavLink>

      <NavLink to="/dependencies" style={styles.link}>
        Dependencies
      </NavLink>

      <NavLink to="/reports" style={styles.link}>
        Reports
      </NavLink>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#E3F1FF",
    height: "100vh",
    paddingTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#0061A2",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default Sidebar;

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardCard from "../components/layout/DashboardCard";

function UserDashboard() {
  return (
    <div style={{ display: "flex", backgroundColor: "#F4FAFF" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar title="User Dashboard" />

        <div style={styles.content}>
          <DashboardCard title="My Tasks" value="12" />
          <DashboardCard title="Completed" value="7" />
          <DashboardCard title="Pending" value="5" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  content: {
    padding: "30px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
};

export default UserDashboard;

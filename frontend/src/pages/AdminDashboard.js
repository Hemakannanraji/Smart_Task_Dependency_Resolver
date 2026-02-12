import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardCard from "../components/layout/DashboardCard";

function AdminDashboard() {
  return (
    <div style={{ display: "flex", backgroundColor: "#F4FAFF" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar title="Admin Dashboard" />

        <div style={styles.content}>
          <DashboardCard title="Total Users" value="1" />
          <DashboardCard title="Active Tasks" value="6" />
          <DashboardCard title="Pending Approvals" value="3" />
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

export default AdminDashboard;

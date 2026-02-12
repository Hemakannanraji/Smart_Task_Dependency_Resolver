function DashboardCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>
      <h2 style={{ color: "#0061A2" }}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "200px",
  },
};

export default DashboardCard;

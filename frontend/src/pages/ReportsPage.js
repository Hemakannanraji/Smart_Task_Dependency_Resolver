
const ReportsPage = ({ tasks = [], completedTasks = [] }) => {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>📄 Reports</h1>

      <div style={card}>
        <h3>Completed Tasks</h3>
        {completedTasks.length === 0 ? (
          <p>No tasks completed yet.</p>
        ) : (
          completedTasks.map((id) => {
            const task = tasks.find((t) => t.id === id);
            return (
              <div key={id} style={{ color: "green" }}>
                ✔ {task?.title}
              </div>
            );
          })
        )}
      </div>

      <div style={card}>
        <h3>Pending Tasks</h3>
        {tasks
          .filter((t) => !completedTasks.includes(t.id))
          .map((task) => (
            <div key={task.id} style={{ color: "red" }}>
              ⏳ {task.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReportsPage;

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "20px",
};

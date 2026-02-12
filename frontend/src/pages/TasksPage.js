import { useState } from "react";

function TasksPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Database", status: "Pending" },
    { id: 2, title: "Implement Auth", status: "Completed" },
  ]);

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F1FF", minHeight: "100vh" }}>
      
      {/* Page Title */}
      <h2 style={{ color: "#0061A2", marginBottom: "20px" }}>
        Manage Tasks
      </h2>

      {/* Create Task Card */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ color: "#0061A2" }}>Create New Task</h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleAddTask}
            style={{
              backgroundColor: "#0061A2",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: "#0061A2", marginBottom: "15px" }}>
          All Tasks
        </h3>

        <table width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#E3F1FF" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={{ padding: "10px" }}>{task.title}</td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "20px",
                      backgroundColor:
                        task.status === "Completed"
                          ? "#d4edda"
                          : "#fff3cd",
                      color:
                        task.status === "Completed"
                          ? "#155724"
                          : "#856404",
                      fontSize: "12px",
                    }}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksPage;

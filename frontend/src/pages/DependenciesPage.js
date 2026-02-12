import React, { useState } from "react";

const DependenciesPage = () => {
  const [tasks] = useState([
    { id: 1, title: "Design Database" },
    { id: 2, title: "Build UI" },
    { id: 3, title: "Setup Backend" },
    { id: 4, title: "API Integration" },
    { id: 5, title: "Testing" },
  ]);

  const [dependencies, setDependencies] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [dependsOn, setDependsOn] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  // -------------------------------
  // Circular Dependency Detection
  // -------------------------------
  const createsCycle = (taskId, dependsOnId) => {
    const graph = {};

    tasks.forEach((task) => {
      graph[task.id] = [];
    });

    dependencies.forEach((dep) => {
      graph[dep.dependsOnId].push(dep.taskId);
    });

    graph[dependsOnId].push(taskId);

    const visited = new Set();
    const recStack = new Set();

    const dfs = (node) => {
      if (!visited.has(node)) {
        visited.add(node);
        recStack.add(node);

        for (let neighbor of graph[node]) {
          if (!visited.has(neighbor) && dfs(neighbor)) {
            return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }
      recStack.delete(node);
      return false;
    };

    return dfs(dependsOnId);
  };

  // -------------------------------
  // Add Dependency
  // -------------------------------
  const handleAddDependency = () => {
    if (!selectedTask || !dependsOn) return;
    if (selectedTask === dependsOn) return;

    const taskId = parseInt(selectedTask);
    const dependsOnId = parseInt(dependsOn);

    const exists = dependencies.some(
      (dep) =>
        dep.taskId === taskId &&
        dep.dependsOnId === dependsOnId
    );

    if (exists) return;

    if (createsCycle(taskId, dependsOnId)) {
      alert("Circular dependency not allowed!");
      return;
    }

    setDependencies([...dependencies, { taskId, dependsOnId }]);
  };

  // -------------------------------
  // Complete Task
  // -------------------------------
  const handleCompleteTask = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  // -------------------------------
  // Reset Project
  // -------------------------------
  const handleReset = () => {
    setCompletedTasks([]);
    setDependencies([]);
  };

  // -------------------------------
  // Helper Functions
  // -------------------------------
  const getTaskTitle = (id) => {
    const task = tasks.find((t) => t.id === id);
    return task ? task.title : "";
  };

  const getChildren = (parentId) => {
    return dependencies
      .filter((dep) => dep.dependsOnId === parentId)
      .map((dep) => dep.taskId);
  };

  const isReady = (taskId) => {
    const requiredDeps = dependencies.filter(
      (dep) => dep.taskId === taskId
    );

    if (requiredDeps.length === 0) return true;

    return requiredDeps.every((dep) =>
      completedTasks.includes(dep.dependsOnId)
    );
  };

  // -------------------------------
  // Progress
  // -------------------------------
  const progressPercentage =
    (completedTasks.length / tasks.length) * 100;

  // -------------------------------
  // Render Tree
  // -------------------------------
  const renderTree = (taskId, level = 0) => {
    const children = getChildren(taskId);

    return (
      <div key={taskId} style={{ marginLeft: level * 25 }}>
        <div
          style={{
            padding: "10px 15px",
            margin: "6px 0",
            borderRadius: "8px",
            background: completedTasks.includes(taskId)
              ? "#e6ffe6"
              : isReady(taskId)
              ? "#E3F1FF"
              : "#ffe3e3",
            borderLeft: `5px solid ${
              completedTasks.includes(taskId)
                ? "green"
                : isReady(taskId)
                ? "#0061A2"
                : "#ff4d4d"
            }`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "500",
          }}
        >
          <span>
            {level > 0 && "└── "}
            {getTaskTitle(taskId)}
          </span>

          {completedTasks.includes(taskId) ? (
            <span style={{ color: "green", fontWeight: "bold" }}>
              COMPLETED
            </span>
          ) : isReady(taskId) ? (
            <button
              onClick={() => handleCompleteTask(taskId)}
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Complete
            </button>
          ) : (
            <span style={{ color: "#ff4d4d" }}>BLOCKED</span>
          )}
        </div>

        {children.map((childId) =>
          renderTree(childId, level + 1)
        )}
      </div>
    );
  };

  const rootTasks = tasks.filter(
    (task) =>
      !dependencies.some((dep) => dep.taskId === task.id)
  );

  // -------------------------------
  // Execution Order
  // -------------------------------
  const getExecutionOrder = () => {
    const graph = {};
    const inDegree = {};

    tasks.forEach((task) => {
      graph[task.id] = [];
      inDegree[task.id] = 0;
    });

    dependencies.forEach((dep) => {
      graph[dep.dependsOnId].push(dep.taskId);
      inDegree[dep.taskId]++;
    });

    const queue = [];
    const order = [];

    Object.keys(inDegree).forEach((taskId) => {
      if (inDegree[taskId] === 0) {
        queue.push(parseInt(taskId));
      }
    });

    while (queue.length > 0) {
      const current = queue.shift();
      order.push(current);

      graph[current].forEach((neighbor) => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }

    return order;
  };


  const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  marginBottom: "30px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  minWidth: "180px",
};

const addBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const resetBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const progressContainer = {
  height: "20px",
  background: "#e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
  marginTop: "10px",
};

const progressBar = {
  height: "100%",
  background: "#22c55e",
  transition: "0.4s ease",
};


  // -------------------------------
  // UI
  // -------------------------------
  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "40px",
      fontFamily: "Segoe UI, sans-serif",
    }}
  >
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          color: "#1e3a8a",
          marginBottom: "30px",
        }}
      >
      Task Dependencies (Workflow Engine)
      </h1>

      {/* ADD DEPENDENCY CARD */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Add Dependency</h3>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>

          <select
            value={dependsOn}
            onChange={(e) => setDependsOn(e.target.value)}
            style={inputStyle}
          >
            <option value="">Depends On</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>

          <button onClick={handleAddDependency} style={addBtn}>
            Add
          </button>

          <button onClick={handleReset} style={resetBtn}>
            Reset
          </button>
        </div>
      </div>

      {/* PROGRESS CARD */}
      <div style={cardStyle}>
        <h3>Project Progress</h3>

        <div style={progressContainer}>
          <div
            style={{
              ...progressBar,
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <p style={{ marginTop: "10px" }}>
          {completedTasks.length} / {tasks.length} Completed
        </p>
      </div>

      {/* DEPENDENCY TREE */}
      <div style={cardStyle}>
        <h3>Dependency Tree</h3>
        {rootTasks.map((task) => renderTree(task.id))}
      </div>

      {/* EXECUTION ORDER */}
      <div style={cardStyle}>
        <h3>Execution Order</h3>

        {getExecutionOrder().map((taskId, index) => (
          <div
            key={taskId}
            style={{
              padding: "10px",
              marginBottom: "8px",
              background: "#e0f2fe",
              borderRadius: "8px",
              borderLeft: "5px solid #0284c7",
            }}
          >
            <strong>{index + 1}.</strong> {getTaskTitle(taskId)}
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default DependenciesPage;

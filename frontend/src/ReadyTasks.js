import React, { useEffect, useState } from "react";

function ReadyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/tasks/ready")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Expected array, got:", data);
        setTasks([]);
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setTasks([]);
    });
}, []);


  return (
    <div>
      <h2>Ready Tasks</h2>

      {tasks.length === 0 ? (
        <p>No ready tasks</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReadyTasks;

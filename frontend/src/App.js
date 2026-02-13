import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TasksPage from "./pages/TasksPage";
import ReportsPage from "./pages/ReportsPage";
import DependenciesPage from "./pages/DependenciesPage";


function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Dashboards */}
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Fallback (optional but recommended) */}
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Task */}
      <Route path="/tasks" element={<TasksPage />} />
      
      {/* Dependency */}
      <Route path="/dependencies" element={<DependenciesPage />} />

      {/* Reports */}
      <Route path="reports" element={<ReportsPage />} />

    </Routes>
  );
}

export default App;
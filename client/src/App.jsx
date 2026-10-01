import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/datasets" element={<div>Datasets</div>} />

            <Route path="/analytics" element={<div>Analytics</div>} />

            <Route path="/reports" element={<div>Reports</div>} />

            <Route path="/users" element={<div>Users & Teams</div>} />

            <Route path="/settings" element={<div>Settings</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import PRCreate from "./components/PRCreate";
import PRList from "./components/PRList";
import POList from "./components/POList";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  return (
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
  path="/pr"
  element={
    <div className="max-w-5xl mx-auto w-full">
      <PRCreate />
      <PRList />
    </div>
  }
/>

        <Route
  path="/po"
  element={
    <div className="max-w-6xl mx-auto w-full">
      <POList />
    </div>
  }
/>
      </Route>
    </Routes>
  );
}

export default AppWrapper;
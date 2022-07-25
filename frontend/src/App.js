import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Role from "./pages/Role";
import { hasPermission } from "./libs/permission";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="max-w-full flex justify-center px-4 py-2">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/role"
            element={
              <ProtectedRoute permissions={["view_role"]}>
                <Role />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <h1 className="font-bold text-3xl mt-3">404! Page Not Found!</h1>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;

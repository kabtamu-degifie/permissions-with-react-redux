import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Role from "./pages/Role";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="max-w-7xl mx-auto px-4 py-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role" element={<Role />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

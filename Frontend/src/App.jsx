import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <Routes>
      {/* CHAT PAGE — DEFAULT LANDING PAGE */}
      <Route
        path="/chat"
        element={
          <div className="app">
            <Sidebar />
            <ChatWindow />
          </div>
        }
      />

      {/* AUTH PAGES (OPTIONAL) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DEFAULT → CHAT */}
      <Route path="*" element={<Navigate to="/chat" />} />
    </Routes>
  );
}

export default App;

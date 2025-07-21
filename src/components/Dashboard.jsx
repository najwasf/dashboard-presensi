import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import History from "./Hiistory";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👋 Selamat Datang di Dashboard Presensi</h2>
      <p>Gunakan menu di bawah untuk navigasi:</p>

      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
        >
          📋 {showHistory ? "Sembunyikan" : "Tampilkan"} Riwayat Presensi
        </button>

        <button
          onClick={handleLogout}
          style={{ padding: "0.5rem 1rem", backgroundColor: "red", color: "white" }}
        >
          🔓 Logout
        </button>
      </div>

      {showHistory && (
        <div style={{ marginTop: "2rem" }}>
          <History />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

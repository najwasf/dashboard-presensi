// src/components/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import History from "./Hiistory";
import TambahDataset from "./TambahDataset";
import "./Dashboard.css"; // ✅ CSS terpisah

const Dashboard = () => {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [showTambahDataset, setShowTambahDataset] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {/* ✅ Logo Gambar */}
        <img
          src={require("../assets/kelasrobot.png")}
          alt="KelasRobot"
          className="logo"
        />

        <div className="menu">
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              setShowTambahDataset(false);
            }}
            className="button default"
          >
            📋 {showHistory ? "Sembunyikan" : "Lihat"} Riwayat
          </button>

          <button
            onClick={() => {
              setShowTambahDataset(!showTambahDataset);
              setShowHistory(false);
            }}
            className="button green"
          >
            ➕ {showTambahDataset ? "Tutup" : "Tambah"} Dataset
          </button>
        </div>

        <button onClick={handleLogout} className="button red logout">
          🔓 Logout
        </button>
      </div>

      <div className="content">
        <h2 className="welcome">👋 Selamat Datang Admin</h2>
        <p className="description">
          Silakan gunakan menu di sebelah kiri untuk navigasi fitur dashboard presensi wajah.
        </p>

        {showHistory && (
          <div className="section">
            <History />
          </div>
        )}

        {showTambahDataset && (
          <div className="section">
            <TambahDataset />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// src/components/TambahDataset.jsx
import React, { useState } from "react";
import axios from "axios";
import "./TambahDataset.css";

const TambahDataset = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      setMessage("❗ Nama dan foto harus diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/upload_dataset", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "✅ Upload berhasil!");
      setName("");
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload gagal.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">🧑‍💼 Tambah Dataset Wajah</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama Lengkap:</label>
        <input
          type="text"
          value={name}
          placeholder="Masukkan nama lengkap"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Upload Foto:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Upload</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default TambahDataset;

// src/components/TambahDataset.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import "./TambahDataset.css";

const TambahDataset = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/upload_dataset", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form setelah upload
      setName("");
      setImage(null);
      fileInputRef.current.value = null;
    } catch (error) {
      // Gagal upload: tidak tampilkan apa-apa
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
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default TambahDataset;

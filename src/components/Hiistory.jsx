import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const History = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const presensiRef = ref(database, "presensi");
    onValue(presensiRef, (snapshot) => {
      const entries = snapshot.val();
      if (entries) {
        const result = Object.entries(entries).map(([nama, value]) => ({
          nama,
          jam_masuk: value.jam_masuk || "-",
          jam_keluar: value.jam_keluar || "-",
        }));

        // Urutkan berdasarkan jam_masuk terbaru
        result.sort((a, b) => new Date(b.jam_masuk) - new Date(a.jam_masuk));

        setData(result);
        setFilteredData(result);
      } else {
        setData([]);
        setFilteredData([]);
      }
    });
  }, []);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    if (selected === "") {
      setFilteredData(data); // reset
    } else {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.jam_masuk).toISOString().slice(0, 10);
        return itemDate === selected;
      });
      setFilteredData(filtered);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map(({ nama, jam_masuk, jam_keluar }) => ({
        Nama: nama,
        "Jam Masuk": jam_masuk,
        "Jam Keluar": jam_keluar,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Riwayat Presensi");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "riwayat_presensi.xlsx");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Riwayat Presensi</h2>

      <label htmlFor="filterTanggal">📅 Pilih Tanggal: </label>
      <input
        id="filterTanggal"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}
      />

      <br />

      <button
        onClick={exportToExcel}
        style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}
      >
        📤 Export ke Excel
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Nama</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.nama}</td>
              <td>{item.jam_masuk}</td>
              <td>{item.jam_keluar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;

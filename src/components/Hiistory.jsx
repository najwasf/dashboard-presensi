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
        const result = Object.entries(entries).map(([id, value]) => ({
          id,
          ...value,
        }));
        result.sort((a, b) => new Date(b.waktu) - new Date(a.waktu));
        setData(result);
        setFilteredData(result); // awalnya tampilkan semua
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
        const itemDate = new Date(item.waktu).toISOString().slice(0, 10);
        return itemDate === selected;
      });
      setFilteredData(filtered);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map(({ nama, waktu }) => ({ Nama: nama, Waktu: waktu }))
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
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>{item.waktu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;

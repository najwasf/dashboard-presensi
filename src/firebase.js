// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5N7fVUmgv3M-mdpk8qr2cU75XeKhtqRc",
  authDomain: "presensi-karyawan-bb8df.firebaseapp.com",
  databaseURL: "https://presensi-karyawan-bb8df-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "presensi-karyawan-bb8df",
  storageBucket: "presensi-karyawan-bb8df.firebasestorage.app",
  messagingSenderId: "870273496886",
  appId: "1:870273496886:web:9a66527a2877d0c6cfe597",
  measurementId: "G-ZFJV1QNNE9"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi Realtime Database
const database = getDatabase(app);

// Export yang dibutuhkan komponen lain
export { database, ref, onValue };

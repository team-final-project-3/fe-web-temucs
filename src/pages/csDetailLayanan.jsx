import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const csDetailLayanan = () => {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <Navbar />

      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">CABANG KCU JAKARTA KOTA</h2>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="text-lg">🕒</span>
            {currentDate}
          </div>
        </div>

        <p className="text-sm mb-4">
          Hallo, Selamat Datang{" "}
          <span className="font-semibold">Asep Kadal</span>
        </p>

        <div className="flex flex-wrap gap-6">
          {/* Box Kiri */}
          <div className="flex-1 min-w-[60%] bg-white rounded-md shadow p-6 text-left">
            <p className="text-lg mb-2 font-medium">
              Antrian No : <span className="font-bold">001</span>
            </p>
            <p className="text-lg mb-2 font-medium">
              Nama :{" "}
              <span className="font-bold uppercase">
                IBU BARBIE VIA SIANTAR
              </span>
            </p>
            <p className="text-lg font-medium">Keluhan :</p>
            <ul className="list-disc list-inside text-orange-500 mt-1 ml-3 space-y-1">
              <li>BUKU HILANG</li>
              <li>RISET PIN</li>
            </ul>
          </div>

          {/* Box Kanan */}
          <div className="w-[300px] bg-white rounded-md shadow p-6 text-center flex flex-col items-center justify-center">
            <p className="text-sm mb-2">Antrian No :</p>
            <p className="text-7xl text-orange-500 font-bold mb-4">001</p>
            <button
              className="bg-green-500 text-white px-4 py-5 rounded-md hover:bg-green-600 w-full cursor-pointer"
              onClick={() => navigate("/cs-dashboard")}
            >
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default csDetailLayanan;

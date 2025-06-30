import React from "react";
import { MonitorX } from "lucide-react";

const NotDesktop = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200">
        <div className="flex justify-center mb-4">
          <MonitorX size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Perhatian</h1>
        <p className="text-gray-600 text-base leading-relaxed">
          Aplikasi ini hanya kompatibel dalam tampilan
          <span className="font-semibold text-gray-800"> desktop ke atas</span>.
          <br />
          Silakan buka dari perangkat dengan resolusi layar lebih besar untuk
          pengalaman yang optimal.
        </p>
        <div className="mt-6">
          <p className="text-sm text-gray-400">
            Terima kasih atas pengertiannya 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotDesktop;

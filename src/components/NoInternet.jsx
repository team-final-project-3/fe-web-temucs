import React from "react";

const NoInternet = ({ onRetry }) => {
  return (
    <div className="flex h-screen items-center justify-center flex-col text-center px-4 bg-gray-50">
      <div className="text-6xl mb-4 animate-bounce">📡</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Oops! Koneksi Terputus
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Sepertinya kamu sedang offline. Periksa koneksi internet kamu dulu, ya.
        Setelah itu, coba refresh halaman ini.
      </p>
      <button
        onClick={onRetry}
        className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow hover:bg-green-700 transition duration-200"
      >
        🔄 Coba Lagi
      </button>
    </div>
  );
};

export default NoInternet;

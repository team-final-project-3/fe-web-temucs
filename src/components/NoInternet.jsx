import React from "react";

const NoInternet = ({ onRetry }) => {
  return (
    <div className="flex h-screen items-center justify-center flex-col text-center px-4">
      <h1 className="text-3xl font-semibold text-gray-700 mb-4">
        Eh, sinyalnya hilang ya?
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Mohon pastikan jaringan internet kamu terhubung, lalu silakan coba buka
        lagi halaman ini.
      </p>
      <button
        onClick={onRetry}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Coba Lagi
      </button>
    </div>
  );
};

export default NoInternet;

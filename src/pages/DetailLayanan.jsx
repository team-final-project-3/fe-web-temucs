import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const DetailLayanan = () => {
  const dokumenLayanan = [
    {
      id: 1,
      name: "KTP",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 2,
      name: "NPWP",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 3,
      name: "Berita Acara Polisi",
      updatedBy: "Windah",
      updatedAt: "10-06-2025",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">LIHAT DOKUMEN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="text-orange-500 text-2xl uppercase font-semibold my-4 mx-3">
            Kartu Debet Hilang
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Updated By</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {dokumenLayanan.map((layanan, index) => (
                  <tr key={layanan.id}>
                    <td>{index + 1}</td>
                    <td>{layanan.name}</td>
                    <td>{layanan.updatedBy}</td>
                    <td>{layanan.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-sm text-gray-500 mt-2">
              Showing {dokumenLayanan.length} out of {dokumenLayanan.length}{" "}
              entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailLayanan;

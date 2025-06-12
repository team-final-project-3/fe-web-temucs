import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const Layanan = () => {
  const layananData = [
    {
      id: 1,
      name: "Kartu Debet Hilang",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 2,
      name: "Kartu Debet Rusak",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 3,
      name: "Buku Tabungan Hilang",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 4,
      name: "Buku Tabungan Rusak",
      updatedBy: "Windah",
      updatedAt: "10-06-2025",
    },
    {
      id: 5,
      name: "Ganti PIN debet",
      updatedBy: "Windah",
      updatedAt: "10-06-2025",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredLayanan = layananData.filter((layanan) =>
    layanan.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">KELOLA LAYANAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Layanan"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NavLink
              to={"/layanan/add-layanan"}
              className="ml-2 px-4 py-2 font-semibold rounded text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              + Add
            </NavLink>
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
                {filteredLayanan.map((layanan, index) => (
                  <tr key={layanan.id}>
                    <td>{index + 1}</td>
                    <td>{layanan.name}</td>
                    <td>{layanan.updatedBy}</td>
                    <td>{layanan.updatedAt}</td>
                    <td className="flex gap-2">
                      <NavLink
                        to={"/layanan/edit-layanan"}
                        className="btn btn-sm btn-warning"
                        title="Edit"
                      >
                        ✏️
                      </NavLink>
                      <button className="btn btn-sm btn-error" title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-sm text-gray-500 mt-2">
              Showing {filteredLayanan.length} out of {layananData.length}{" "}
              entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Layanan;

import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const Dokumen = () => {
  const dokumenList = [
    {
      id: 1,
      name: "KTP",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 2,
      name: "KK",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 3,
      name: "Buku Tabungan Lama",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 4,
      name: "Materai",
      updatedBy: "Windah",
      updatedAt: "10-06-2025",
    },
    {
      id: 5,
      name: "BA Polisi",
      updatedBy: "Windah",
      updatedAt: "10-06-2025",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredDoc = dokumenList.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">KELOLA DOKUMEN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Dokumen"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NavLink
              to={"/dokumen/add-dokumen"}
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
                {filteredDoc.map((doc, index) => (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{doc.updatedBy}</td>
                    <td>{doc.updatedAt}</td>
                    <td className="flex gap-2">
                      <NavLink
                        to={"/dokumen/edit-dokumen"}
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
              Showing {filteredDoc.length} out of {dokumenList.length} entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dokumen;

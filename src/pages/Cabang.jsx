import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const Cabang = () => {
  const branchesData = [
    { id: 1, name: "KCU JAKARTA KOTA", location: "Jl. Lada No.1, Jakarta." },
    {
      id: 2,
      name: "KCU Pasar Tanah Abang",
      location: "Jl. Jend. Sudirman Kav 1, Jakarta",
    },
    {
      id: 3,
      name: "KCP Cempaka Mas",
      location: "Jl. Letjen. Supripto, Rukan Graha Cempaka",
    },
    {
      id: 4,
      name: "KCP Cideng",
      location: "Jl. KH. Hasyim Ashari No. 39B, Jakarta Pusat",
    },
    {
      id: 5,
      name: "KCP Cikini",
      location: "Jl. Cikini Raya Kav. 62-64, Jakarta Pusat",
    },
    {
      id: 6,
      name: "KCP Harmoni",
      location: "Jl. Gajah Mada No. 3-5, Komp. Pertokoan",
    },
    {
      id: 7,
      name: "KCU Pasar Tanah Abang",
      location: "di Jl. Jend. Sudirman Kav 1, Jakarta",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredBranches = branchesData.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">KELOLA CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Cabang"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NavLink
              to={"/cabang/add-cabang"}
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
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch, index) => (
                  <tr key={branch.id}>
                    <td>{index + 1}</td>
                    <td>{branch.name}</td>
                    <td>{branch.location}</td>
                    <td className="flex gap-2">
                      <NavLink
                        to={"/cabang/detail-cabang"}
                        className="btn btn-sm btn-info"
                        title="View"
                      >
                        👁
                      </NavLink>
                      <NavLink
                        to={"/cabang/edit-cabang"}
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
              Showing {filteredBranches.length} out of {branchesData.length}{" "}
              entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cabang;

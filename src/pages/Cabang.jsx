import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

const Cabang = () => {
  const [cabang, setCabang] = useState([]);
  const [search, setSearch] = useState("");

  const getCabang = async () => {
    try {
      const response = await api.get("/branch");
      setCabang(response.data.branches);
    } catch (error) {
      console.error("Gagal mengambil data cabang:", error);
    }
  };

  useEffect(() => {
    getCabang();
  }, []);

  const filteredBranches = cabang.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (id) => {
    const cabangToUpdate = cabang.find((item) => item.id === id);
    if (!cabangToUpdate) return alert("Cabang tidak ditemukan");

    const payload = {
      name: cabangToUpdate.name,
      branchCode: cabangToUpdate.branchCode,
      address: cabangToUpdate.address,
      longitude: cabangToUpdate.longitude,
      latitude: cabangToUpdate.latitude,
      holiday: cabangToUpdate.holiday,
      status: !cabangToUpdate.status,
      updatedBy: cabangToUpdate.updatedBy,
    };

    try {
      await api.put(`/branch/${id}`, payload);
      getCabang();
    } catch (error) {
      console.error("Gagal mengubah status cabang:", error);
      alert(error?.response?.data?.message || "Terjadi kesalahan.");
    }
  };

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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch, index) => (
                  <tr key={branch.id}>
                    <td>{index + 1}</td>
                    <td>{branch.name}</td>
                    <td>{branch.address}</td>
                    <td>{branch.status === true ? "Aktif" : "Nonaktif"}</td>
                    <td className="flex gap-2">
                      <NavLink
                        to={`/cabang/${branch.id}`}
                        className="btn btn-sm btn-info"
                        title="View"
                      >
                        👁
                      </NavLink>
                      <NavLink
                        to={`/cabang/edit/${branch.id}`}
                        className="btn btn-sm btn-warning"
                        title="Edit"
                      >
                        ✏️
                      </NavLink>
                      <button
                        onClick={() => handleToggleStatus(branch.id)}
                        className={`btn btn-sm ${
                          branch.status ? "btn-error" : "btn-success"
                        }`}
                        title={branch.status ? "Nonaktifkan" : "Aktifkan"}
                      >
                        {branch.status ? "🗑️" : "✅"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-sm text-gray-500 mt-2">
              Showing {filteredBranches.length} out of {cabang.length} entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cabang;

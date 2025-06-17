import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

const Cabang = () => {
  const [cabang, setCabang] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getCabang = async () => {
    try {
      const response = await api.get("/branch");
      setCabang(response.data.branches);
    } catch (error) {
      console.error("Gagal mengambil data cabang:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCabang();
  }, []);

  const filteredBranches = cabang.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );

  const confirmToggleStatus = (branch) => {
    setSelectedBranch(branch);
    setShowModal(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedBranch) return;

    const payload = {
      name: selectedBranch.name,
      branchCode: selectedBranch.branchCode,
      address: selectedBranch.address,
      longitude: selectedBranch.longitude,
      latitude: selectedBranch.latitude,
      holiday: selectedBranch.holiday,
      status: !selectedBranch.status,
      updatedBy: selectedBranch.updatedBy,
    };

    try {
      setLoading(true);
      await api.put(`/branch/${selectedBranch.id}`, payload);
      setShowModal(false);
      setSelectedBranch(null);
      await getCabang();
    } catch (error) {
      console.error("Gagal mengubah status cabang:", error);
      alert(error?.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
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
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : filteredBranches.length > 0 ? (
              <>
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
                        <td>{branch.status ? "Aktif" : "Nonaktif"}</td>
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
                            onClick={() => confirmToggleStatus(branch)}
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
                  Showing {filteredBranches.length} out of {cabang.length}{" "}
                  entries
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Tidak ada cabang yang ditemukan.
              </div>
            )}
          </div>
        </div>

        {showModal && selectedBranch && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">
                Konfirmasi Perubahan Status
              </h3>
              <p>
                Apakah kamu yakin ingin{" "}
                <strong>
                  {selectedBranch.status ? "menonaktifkan" : "mengaktifkan"}
                </strong>{" "}
                cabang <strong>{selectedBranch.name}</strong>?
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleToggleStatus}
                  className={`btn btn-sm ${
                    selectedBranch.status ? "btn-error" : "btn-success"
                  }`}
                >
                  {selectedBranch.status ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cabang;

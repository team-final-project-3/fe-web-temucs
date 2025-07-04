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
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getCabang = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/branch?page=${page}&size=${size}&search=${search}`
      );
      setCabang(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Gagal mengambil data cabang:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCabang();
  }, [page, size, search]);

  const confirmToggleStatus = (branch) => {
    setSelectedBranch(branch);
    setShowModal(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedBranch) return;
    try {
      setLoading(true);
      await api.put(`/branch/${selectedBranch.id}/status`);
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

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const sortedBranches = [...cabang].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">KELOLA CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              placeholder="Cari Cabang"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <NavLink
              to={"/cabang/add-cabang"}
              className="btn bg-orange-500 hover:bg-orange-600 text-white"
            >
              + Add
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : sortedBranches.length > 0 ? (
              <>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th
                        onClick={() => requestSort("name")}
                        className="cursor-pointer"
                      >
                        Name {renderSortIcon("name")}
                      </th>
                      <th
                        onClick={() => requestSort("address")}
                        className="cursor-pointer"
                      >
                        Location {renderSortIcon("address")}
                      </th>
                      <th
                        onClick={() => requestSort("status")}
                        className="cursor-pointer"
                      >
                        Status {renderSortIcon("status")}
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch, index) => (
                      <tr key={branch.id}>
                        <td>{(page - 1) * size + index + 1}</td>
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
                            to={`/cabang/edit-cabang/${branch.id}`}
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

                <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="font-medium">Tampilkan:</label>
                    <select
                      className="select select-bordered select-sm"
                      value={size}
                      onChange={(e) => {
                        setSize(parseInt(e.target.value));
                        setPage(1);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="text-sm">per halaman</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      Prev
                    </button>
                    <span className="text-sm">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </div>
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

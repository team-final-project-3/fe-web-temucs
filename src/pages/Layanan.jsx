import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";
import formatDate from "../utils/formatDate";

const Layanan = () => {
  const [search, setSearch] = useState("");
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getAllServices = async () => {
    setLoading(true);
    try {
      const response = await api.get("/service/user");
      setService(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const filteredLayanan = service.filter((layanan) =>
    (layanan.serviceName || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedLayanan = [...filteredLayanan].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (sortConfig.key === "updatedAt") {
      return sortConfig.direction === "asc"
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
  });

  const paginatedLayanan = sortedLayanan.slice((page - 1) * size, page * size);

  useEffect(() => {
    setTotalPages(Math.ceil(sortedLayanan.length / size));
    if (page > Math.ceil(sortedLayanan.length / size)) {
      setPage(1);
    }
  }, [sortedLayanan.length, size]);

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

  const confirmToggleStatus = (layanan) => {
    setSelectedService(layanan);
    setShowModal(true);
  };

  const handleSoftDeleteService = async () => {
    if (!selectedService) return;

    try {
      setLoadingId(selectedService.id);
      await api.put(`/service/${selectedService.id}/status`);
      await getAllServices();
    } catch (error) {
      console.error("Gagal mengubah status layanan:", error);
      alert(error?.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoadingId(null);
      setShowModal(false);
      setSelectedService(null);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">KELOLA LAYANAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <input
              type="text"
              placeholder="Cari Layanan"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <NavLink
              to={"/layanan/add-layanan"}
              className="px-4 py-2 font-semibold rounded text-white bg-orange-500 hover:bg-orange-600"
            >
              + Add
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : paginatedLayanan.length > 0 ? (
              <>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th
                        onClick={() => requestSort("serviceName")}
                        className="cursor-pointer"
                      >
                        Name {renderSortIcon("serviceName")}
                      </th>
                      <th
                        onClick={() => requestSort("estimatedTime")}
                        className="cursor-pointer"
                      >
                        Estimate Time {renderSortIcon("estimatedTime")}
                      </th>
                      <th
                        onClick={() => requestSort("status")}
                        className="cursor-pointer"
                      >
                        Status {renderSortIcon("status")}
                      </th>
                      <th
                        onClick={() => requestSort("updatedBy")}
                        className="cursor-pointer"
                      >
                        Updated By {renderSortIcon("updatedBy")}
                      </th>
                      <th
                        onClick={() => requestSort("updatedAt")}
                        className="cursor-pointer"
                      >
                        Updated At {renderSortIcon("updatedAt")}
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLayanan.map((layanan, index) => (
                      <tr key={layanan.id}>
                        <td>{(page - 1) * size + index + 1}</td>
                        <td>{layanan.serviceName}</td>
                        <td>{layanan.estimatedTime}</td>
                        <td>{layanan.status ? "Aktif" : "Nonaktif"}</td>
                        <td>{layanan.updatedBy}</td>
                        <td>{formatDate(layanan.updatedAt)}</td>
                        <td className="flex gap-2">
                          <NavLink
                            to={`/layanan/${layanan.id}`}
                            className="btn btn-sm btn-info"
                            title="View"
                          >
                            👁
                          </NavLink>
                          <NavLink
                            to={`/layanan/edit-layanan/${layanan.id}`}
                            className="btn btn-sm btn-warning"
                            title="Edit"
                          >
                            ✏️
                          </NavLink>
                          <button
                            onClick={() => confirmToggleStatus(layanan)}
                            className={`btn btn-sm ${
                              layanan.status ? "btn-error" : "btn-success"
                            }`}
                            title={layanan.status ? "Nonaktifkan" : "Aktifkan"}
                            disabled={loadingId === layanan.id}
                          >
                            {loadingId === layanan.id
                              ? "⏳"
                              : layanan.status
                              ? "🗑️"
                              : "✅"}
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
                Tidak ada layanan yang ditemukan.
              </div>
            )}
          </div>
        </div>

        {showModal && selectedService && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Konfirmasi</h3>
              <p>
                Apakah kamu yakin ingin{" "}
                <strong>
                  {selectedService.status ? "menonaktifkan" : "mengaktifkan"}
                </strong>{" "}
                layanan <strong>{selectedService.serviceName}</strong>?
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedService(null);
                  }}
                  className="btn btn-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleSoftDeleteService}
                  className={`btn btn-sm ${
                    selectedService.status ? "btn-error" : "btn-success"
                  }`}
                >
                  {selectedService.status ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Layanan;

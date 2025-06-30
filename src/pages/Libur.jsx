import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";
import formatDate from "../utils/formatDate.js";

const Libur = () => {
  const [holidayData, setHolidayData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getHoliday = async () => {
    try {
      const response = await api.get("/holiday");
      setHolidayData(response.data.holidays || []);
    } catch (error) {
      console.error("Gagal mengambil data libur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHoliday();
  }, []);

  const filteredHoliday = holidayData.filter((holiday) =>
    (holiday.holidayName || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedHoliday = [...filteredHoliday].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === "date" || sortConfig.key === "updatedAt") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  const paginatedHoliday = sortedHoliday.slice((page - 1) * size, page * size);

  useEffect(() => {
    setTotalPages(Math.ceil(sortedHoliday.length / size));
    if (page > Math.ceil(sortedHoliday.length / size)) {
      setPage(1);
    }
  }, [sortedHoliday.length, size]);

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

  const confirmDelete = (holiday) => {
    setSelectedHoliday(holiday);
    setShowModal(true);
  };

  const handleSoftDeleteHoliday = async () => {
    try {
      await api.put(`/holiday/${selectedHoliday.id}/status`);
      setShowModal(false);
      setSelectedHoliday(null);
      setLoading(true);
      getHoliday();
    } catch (error) {
      console.error("Gagal menghapus libur:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">KELOLA HARI LIBUR</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Hari Libur"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <NavLink
              to={"/libur/add-libur"}
              className="ml-2 px-4 py-2 font-semibold rounded text-white bg-orange-500 hover:bg-orange-600"
            >
              + Add
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : paginatedHoliday.length > 0 ? (
              <>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th
                        onClick={() => requestSort("holidayName")}
                        className="cursor-pointer"
                      >
                        Name {renderSortIcon("holidayName")}
                      </th>
                      <th
                        onClick={() => requestSort("date")}
                        className="cursor-pointer"
                      >
                        Date {renderSortIcon("date")}
                      </th>
                      <th
                        onClick={() => requestSort("status")}
                        className="cursor-pointer"
                      >
                        Status {renderSortIcon("status")}
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
                    {paginatedHoliday.map((holiday, index) => (
                      <tr key={holiday.id}>
                        <td>{(page - 1) * size + index + 1}</td>
                        <td>{holiday.holidayName}</td>
                        <td>{formatDate(holiday.date)}</td>
                        <td>{holiday.status ? "Aktif" : "Nonaktif"}</td>
                        <td>{formatDate(holiday.updatedAt)}</td>
                        <td className="flex gap-2">
                          <NavLink
                            to={`/libur/edit-libur/${holiday.id}`}
                            className="btn btn-sm btn-warning"
                            title="Edit"
                          >
                            ✏️
                          </NavLink>
                          <button
                            onClick={() => confirmDelete(holiday)}
                            className="btn btn-sm btn-error"
                            title="Delete"
                          >
                            🗑️
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
                Tidak ada hari libur yang ditemukan.
              </div>
            )}
          </div>
        </div>

        {showModal && selectedHoliday && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
              <p>
                Apakah kamu yakin ingin menghapus libur{" "}
                <strong>{selectedHoliday.holidayName}</strong>?
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleSoftDeleteHoliday}
                  className="btn btn-sm btn-error"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Libur;

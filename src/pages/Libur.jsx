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

  const getHoliday = async () => {
    try {
      const response = await api.get("/holiday");
      setHolidayData(response.data.holidays);
    } catch (error) {
      console.error("Gagal mengambil data libur:", error);
    }
  };

  useEffect(() => {
    getHoliday();
  }, []);

  const filteredHoliday = holidayData.filter((holiday) =>
    (holiday.holidayName || "").toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (holiday) => {
    setSelectedHoliday(holiday);
    setShowModal(true);
  };

  const handleDeleteHoliday = async () => {
    try {
      await api.delete(`/holiday/${selectedHoliday.id}`);
      setShowModal(false);
      setSelectedHoliday(null);
      getHoliday();
    } catch (error) {
      console.error("Gagal menghapus libur:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">KELOLA HARI LIBUR</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Hari Libur"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NavLink
              to={"/libur/add-libur"}
              className="ml-2 px-4 py-2 font-semibold rounded text-white bg-orange-500 hover:bg-orange-600"
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
                  <th>Date</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHoliday.map((holiday, index) => (
                  <tr key={holiday.id}>
                    <td>{index + 1}</td>
                    <td>{holiday.holidayName}</td>
                    <td>{formatDate(holiday.date)}</td>
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

            <div className="text-sm text-gray-500 mt-2">
              Showing {filteredHoliday.length} out of {holidayData.length}{" "}
              entries
            </div>
          </div>
        </div>

        {showModal && selectedHoliday && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
              <p>
                Apakah kamu yakin ingin menghapus libur{" "}
                <strong>{selectedHoliday.name}</strong>?
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteHoliday}
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

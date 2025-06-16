import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";
import formatDate from "../utils/formatDate";

const Layanan = () => {
  const [search, setSearch] = useState("");
  const [service, setService] = useState([]);

  const getAllServices = async () => {
    try {
      const response = await api.get("/service");
      setService(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const filteredLayanan = service.filter((layanan) =>
    (layanan.serviceName || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleNonactiveService = async (id) => {
    const layananToUpdate = service.find((item) => item.id === id);
    if (!layananToUpdate) return alert("Layanan tidak ditemukan");

    const payload = {
      serviceName: layananToUpdate.serviceName,
      estimatedTime: layananToUpdate.estimatedTime,
      updatedBy: layananToUpdate.updatedBy || "admin",
      status: !layananToUpdate.status,
    };

    try {
      const response = await api.put(`/service/${id}`, payload);
      console.log(response.data);
      getAllServices();
    } catch (error) {
      console.error("Gagal mengubah status layanan:", error);
      alert(error?.response?.data?.message || "Terjadi kesalahan.");
    }
  };

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
                  <th>Status</th>
                  <th>Updated By</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {filteredLayanan.map((layanan, index) => (
                  <tr key={layanan.id}>
                    <td>{index + 1}</td>
                    <td>{layanan.serviceName}</td>
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
                        onClick={() => handleNonactiveService(layanan.id)}
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
              Showing {filteredLayanan.length} out of {service.length} entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Layanan;

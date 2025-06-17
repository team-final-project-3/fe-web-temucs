import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Nasabah = () => {
  const [activeTab, setActiveTab] = useState("online");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [nasabahData, setNasabahData] = useState({
    online: [],
    offline: [],
  });

  const getAllNasabah = async () => {
    try {
      const response = await api.get("/queue");
      const allNasabah = response.data.data;

      console.log(response.data);

      const online = allNasabah.filter((item) => item.loketId === null);
      const offline = allNasabah.filter((item) => item.loketId !== null);

      setNasabahData({ online, offline });
    } catch (error) {
      console.error("Gagal mengambil data nasabah:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNasabah();
  }, []);

  const filteredData =
    nasabahData[activeTab]?.filter((item) =>
      (item.name || "").toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">LIHAT NASABAH</h2>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div role="tablist" className="tabs tabs-lift mb-4">
              <button
                role="tab"
                className={`tab ${
                  activeTab === "online"
                    ? "bg-orange-500 !text-white border-orange-500 shadow"
                    : ""
                }`}
                onClick={() => setActiveTab("online")}
                style={
                  activeTab === "online"
                    ? {}
                    : { border: ".2px solid #a6a6a6", color: "#FE8B1F" }
                }
              >
                ONLINE
              </button>
              <button
                role="tab"
                className={`tab ${
                  activeTab === "offline"
                    ? "bg-orange-500 !text-white border-orange-500 shadow"
                    : ""
                }`}
                onClick={() => setActiveTab("offline")}
                style={
                  activeTab === "offline"
                    ? {}
                    : { border: ".2px solid #a6a6a6", color: "#FE8B1F" }
                }
              >
                OFFLINE
              </button>
            </div>
            <input
              type="text"
              placeholder="Search Nasabah"
              className="input input-bordered w-full max-w-sm mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-10 font-medium text-gray-600">
              Loading...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>No HP</th>
                    <th>Cabang</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.user.email}</td>
                        <td>{item.user.phoneNumber}</td>
                        <td>{item.branch.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-400">
                        Tidak ada data nasabah ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Nasabah;

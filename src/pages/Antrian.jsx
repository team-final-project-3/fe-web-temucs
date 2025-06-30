import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Antrian = () => {
  const [listAntrian, setListAntrian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAntrian = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/queue?page=${page}&size=${size}`);
      const data = response.data?.data || [];
      setListAntrian(data);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Gagal fetch data antrian:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAntrian();
  }, [page, size]);

  const filteredAntrian = listAntrian
    .filter((item) => {
      if (activeTab === "online") return item.loketId === null;
      if (activeTab === "offline") return item.loketId !== null;
      return true;
    })
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const sortedAntrian = [...filteredAntrian].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

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

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">LIHAT ANTRIAN</h2>

        <div className="p-4 bg-white rounded-lg shadow border border-gray-200 mb-4 flex flex-wrap justify-between gap-2 items-center">
          <div role="tablist" className="tabs tabs-lift">
            {["all", "online", "offline"].map((tab) => (
              <button
                key={tab}
                role="tab"
                className={`tab capitalize ${
                  activeTab === tab
                    ? "bg-orange-500 !text-white border-orange-500 shadow"
                    : ""
                }`}
                onClick={() => setActiveTab(tab)}
                style={
                  activeTab === tab
                    ? {}
                    : { border: ".2px solid #a6a6a6", color: "#FE8B1F" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Cari nama, email, nomor tiket, dll..."
            className="input input-bordered max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : (
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
                        onClick={() => requestSort("email")}
                        className="cursor-pointer"
                      >
                        Email {renderSortIcon("email")}
                      </th>
                      <th
                        onClick={() => requestSort("phoneNumber")}
                        className="cursor-pointer"
                      >
                        Phone {renderSortIcon("phoneNumber")}
                      </th>
                      <th
                        onClick={() => requestSort("ticketNumber")}
                        className="cursor-pointer"
                      >
                        Ticket {renderSortIcon("ticketNumber")}
                      </th>
                      <th
                        onClick={() => requestSort("branchName")}
                        className="cursor-pointer"
                      >
                        Branch {renderSortIcon("branchName")}
                      </th>
                      <th
                        onClick={() => requestSort("status")}
                        className="cursor-pointer"
                      >
                        Status {renderSortIcon("status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAntrian.length > 0 ? (
                      sortedAntrian.map((item, index) => (
                        <tr key={item.id}>
                          <td>{(page - 1) * size + index + 1}</td>
                          <td>{item.name || item.user?.fullname || "-"}</td>
                          <td>{item.user?.email || "-"}</td>
                          <td>{item.user?.phoneNumber || "-"}</td>
                          <td>{item.ticketNumber}</td>
                          <td>{item.branch?.name || "-"}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.status === "done"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "in progress"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : item.status === "canceled"
                                  ? "bg-red-100 text-red-700"
                                  : item.status === "waiting"
                                  ? "bg-blue-100 text-blue-700"
                                  : item.status === "skipped"
                                  ? "bg-gray-200 text-gray-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {item.status || "-"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center text-gray-600 py-4"
                        >
                          Tidak ada data antrian ditemukan.
                        </td>
                      </tr>
                    )}
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
                      <option value={15}>15</option>
                      <option value={20}>20</option>
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
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Antrian;

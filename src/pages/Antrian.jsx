import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Antrian = () => {
  const [offlineList, setOfflineList] = useState([]);
  const [onlineList, setOnlineList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [pagination, setPagination] = useState({
    all: { page: 1, size: 10 },
    online: { page: 1, size: 10 },
    offline: { page: 1, size: 10 },
  });

  const fetchAllAntrian = async () => {
    try {
      setLoading(true);
      const pageSize = 50;
      let allData = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const res = await api.get(
          `/queue?page=${currentPage}&size=${pageSize}`
        );
        const data = res.data.data || [];
        totalPages = res.data.pagination.totalPages;
        allData = [...allData, ...data];
        currentPage++;
      } while (currentPage <= totalPages);

      const offline = allData.filter((item) => item.loketId !== null);
      const online = allData.filter((item) => item.loketId === null);

      setOfflineList(offline);
      setOnlineList(online);
    } catch (err) {
      console.error("Gagal fetch semua antrian:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAntrian();
  }, []);

  const getActiveList = () => {
    if (activeTab === "offline") return offlineList;
    if (activeTab === "online") return onlineList;

    return [...offlineList, ...onlineList].sort((a, b) => {
      const dateA = new Date(a.bookingDate || "1970-01-01");
      const dateB = new Date(b.bookingDate || "1970-01-01");
      return dateA - dateB;
    });
  };

  const getFilteredList = () => {
    return getActiveList().filter((item) =>
      [item.name, item.user?.email, item.ticketNumber]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  const getSortedList = () => {
    const filtered = getFilteredList();
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? "";
      const bVal = b[sortConfig.key] ?? "";

      if (typeof aVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
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

  const currentPage = pagination[activeTab].page;
  const currentSize = pagination[activeTab].size;
  const sortedList = getSortedList();
  const totalPages = Math.ceil(sortedList.length / currentSize);
  const paginatedList = sortedList.slice(
    (currentPage - 1) * currentSize,
    currentPage * currentSize
  );

  const updatePage = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], page: newPage },
    }));
  };

  const updateSize = (newSize) => {
    setPagination((prev) => ({
      ...prev,
      [activeTab]: { page: 1, size: parseInt(newSize) },
    }));
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
                    {paginatedList.length > 0 ? (
                      paginatedList.map((item, index) => (
                        <tr key={item.id}>
                          <td>{(currentPage - 1) * currentSize + index + 1}</td>
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
                                  : item.status === "called"
                                  ? "bg-purple-100 text-purple-700"
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
                      value={currentSize}
                      onChange={(e) => updateSize(e.target.value)}
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
                      onClick={() => updatePage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        updatePage(Math.min(currentPage + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
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

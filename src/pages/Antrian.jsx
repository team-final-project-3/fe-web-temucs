import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Antrian = () => {
  const [listAntrian, setListAntrian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const fetchAntrian = async () => {
    try {
      const response = await api.get("/queue");
      const data = response.data?.data || [];

      const mapped = data.flatMap((item) =>
        item.queueLogs.map((log) => ({
          id: `${item.ticketNumber}-${new Date(log.createdAt).getTime()}`,
          name: item.name || item.user?.fullname || "-",
          email: item.user?.email || "-",
          phoneNumber: item.user?.phoneNumber || "-",
          dateTime: new Date(log.createdAt).toLocaleString("id-ID", {
            dateStyle: "short",
            timeStyle: "medium",
          }),
          rawDate: new Date(log.createdAt),
          ticketNumber: item.ticketNumber,
          status:
            log.status === "waiting"
              ? "Waiting"
              : log.status === "in progress"
              ? "In Progress"
              : log.status === "done"
              ? "Done"
              : log.status === "canceled"
              ? "Canceled"
              : log.status === "skipped"
              ? "Skipped"
              : log.status,
          branchName: item.branch?.name || "-",
          loketId: item.loketId,
        }))
      );

      setListAntrian(mapped);
    } catch (error) {
      console.error("Gagal fetch data antrian:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAntrian();
  }, []);

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

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
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
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">LIHAT ANTRIAN</h2>

        <div className="p-4 bg-white rounded-lg shadow border border-gray-200 mb-4 flex justify-between items-center">
          <div role="tablist" className="tabs tabs-lift mb-2">
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
            className="input input-bordered"
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
                      onClick={() => requestSort("rawDate")}
                      className="cursor-pointer"
                    >
                      Date {renderSortIcon("rawDate")}
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
                    sortedAntrian.map((antrian, index) => (
                      <tr key={antrian.id}>
                        <td>{index + 1}</td>
                        <td>{antrian.name}</td>
                        <td>{antrian.email}</td>
                        <td>{antrian.phoneNumber}</td>
                        <td>{antrian.ticketNumber}</td>
                        <td>{antrian.branchName}</td>
                        <td>{antrian.dateTime}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              antrian.status === "Done"
                                ? "bg-green-100 text-green-700"
                                : antrian.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : antrian.status === "Canceled"
                                ? "bg-red-100 text-red-700"
                                : antrian.status === "Waiting"
                                ? "bg-blue-100 text-blue-700"
                                : antrian.status === "Skipped"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {antrian.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-gray-600 py-4"
                      >
                        Tidak ada data antrian yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Antrian;

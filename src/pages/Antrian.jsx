import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Antrian = () => {
  const [listAntrian, setListAntrian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const fetchAntrian = async () => {
    try {
      const response = await api.get("/queue");
      const data = response.data?.data || [];

      console.log(data);

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

  const filteredAntrian = listAntrian.filter((item) => {
    if (activeTab === "online") return item.loketId === null;
    if (activeTab === "offline") return item.loketId !== null;
    return true;
  });

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">LIHAT ANTRIAN</h2>

        <div className="p-4 bg-white rounded-lg shadow border border-gray-200 mb-4">
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Ticket Number</th>
                    <th>Branch Name</th>
                    <th>Date Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAntrian.length > 0 ? (
                    filteredAntrian.map((antrian, index) => (
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
                        colSpan="6"
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

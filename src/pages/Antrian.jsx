import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Antrian = () => {
  const [listAntrian, setListAntrian] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAntrian = async () => {
    try {
      const response = await api.get("/queue");
      console.log(response.data);

      const data = response.data?.data || [];

      const mapped = data.flatMap((item) =>
        item.queueLogs.map((log, index) => ({
          id: `${item.ticketNumber}-${index}`,
          name: item.name,
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

    const intervalId = setInterval(() => {
      fetchAntrian();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">LIHAT ANTRIAN</h2>

        {!loading && listAntrian.length === 0 && (
          <div className="mb-3 text-center text-gray-600 font-medium">
            Tidak ada data yang ditemukan.
          </div>
        )}

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
                    <th>Number</th>
                    <th>Name</th>
                    <th>Date Time</th>
                    <th>Ticket Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listAntrian.map((antrian, index) => (
                    <tr key={antrian.id}>
                      <td>{index + 1}</td>
                      <td>{antrian.name}</td>
                      <td>{antrian.dateTime}</td>
                      <td>{antrian.ticketNumber}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${
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
                            }
                          `}
                        >
                          {antrian.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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

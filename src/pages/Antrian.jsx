import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const Antrian = () => {
  const listAntrian = [
    {
      id: 1,
      name: "Asep Kadal",
      dateTime: "2025-06-09 09:00:01",
      ticketNumber: "JKU-0001",
      status: "Done",
    },
    {
      id: 2,
      name: "Kepin Joki",
      dateTime: "2025-06-09 09:00:02",
      ticketNumber: "JKU-0002",
      status: "Done",
    },
    {
      id: 3,
      name: "Oka Chan",
      dateTime: "2025-06-09 09:00:03",
      ticketNumber: "JKU-0003",
      status: "On Progress",
    },
    {
      id: 4,
      name: "Maselinyo Manaul",
      dateTime: "2025-06-09 09:00:04",
      ticketNumber: "JKU-0004",
      status: "Canceled",
    },
    {
      id: 5,
      name: "Mak Iren",
      dateTime: "2025-06-09 09:00:05",
      ticketNumber: "JKU-0005",
      status: "Done",
    },
    {
      id: 6,
      name: "Via Pake P",
      dateTime: "2025-06-09 09:00:07",
      ticketNumber: "JKU-0006",
      status: "Skipped",
    },
    {
      id: 7,
      name: "Juicy Json",
      dateTime: "2025-06-09 09:00:08",
      ticketNumber: "JKU-0007",
      status: "Done",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">LIHAT ANTRIAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="overflow-x-auto">
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
                              : antrian.status === "On Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : antrian.status === "Canceled"
                              ? "bg-red-100 text-red-700"
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
            <div className="text-sm text-gray-500 mt-2">
              Showing {listAntrian.length} out of {listAntrian.length} entries
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Antrian;

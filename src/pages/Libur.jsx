import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

const Libur = () => {
  const holidayData = [
    {
      id: 1,
      name: "Libur tahun baru",
      date: "01-01-1990",
      updatedAt: "10-06-2025",
    },
    {
      id: 2,
      name: "Isra Mi'raj Nabi Muhammad SAW",
      date: "27-01-2025",
      updatedAt: "10-06-2025",
    },
    {
      id: 3,
      name: "Tahun Baru Imlek ",
      date: "29-01-2025",
      updatedAt: "10-06-2025",
    },
    {
      id: 4,
      name: "Hari Suci Nyepi",
      date: "29-03-2025",
      updatedAt: "10-06-2025",
    },
    {
      id: 5,
      name: "Natal",
      date: "25-12-2025",
      updatedAt: "10-06-2025",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredHoliday = holidayData.filter((holiday) =>
    holiday.name.toLowerCase().includes(search.toLowerCase())
  );

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
                  <th>Date</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {filteredHoliday.map((holiday, index) => (
                  <tr key={holiday.id}>
                    <td>{index + 1}</td>
                    <td>{holiday.name}</td>
                    <td>{holiday.date}</td>
                    <td>{holiday.updatedAt}</td>
                    <td className="flex gap-2">
                      <NavLink
                        to={"/libur/edit-libur"}
                        className="btn btn-sm btn-warning"
                        title="Edit"
                      >
                        ✏️
                      </NavLink>
                      <button className="btn btn-sm btn-error" title="Delete">
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
      </div>
    </Layout>
  );
};

export default Libur;

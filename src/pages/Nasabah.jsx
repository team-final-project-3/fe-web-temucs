import React, { useState } from "react";
import Layout from "../components/Layout";

const dummyData = {
  online: [
    {
      id: 1,
      name: "Asep Kadal",
      email: "a*****@g***.com",
      phone: "08******19",
      role: "Nasabah",
    },
    {
      id: 2,
      name: "Oka Chan",
      email: "o*****@g***.com",
      phone: "08******29",
      role: "Nasabah",
    },
  ],
  offline: [
    {
      id: 3,
      name: "Via Peke P",
      email: "v*****@g***.com",
      phone: "08******89",
      role: "Nasabah",
    },
    {
      id: 4,
      name: "Juicy Json",
      email: "j*****@g***.com",
      phone: "08******81",
      role: "Admin",
    },
  ],
};

const Nasabah = () => {
  const [activeTab, setActiveTab] = useState("online");
  const [search, setSearch] = useState("");

  const filteredData = dummyData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between">
            {/* Tabs */}
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

            {/* Search */}
            <input
              type="text"
              placeholder="Search Nasabah"
              className="input input-bordered w-full max-w-sm mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>No HP</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Nasabah;

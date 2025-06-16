import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

const Cabang = () => {
  const [cabang, setCabang] = useState([]);

  const [search, setSearch] = useState("");

  const getCabang = async () => {
    const response = await api.get("/branch");
    setCabang(response.data.branches);
  };

  useEffect(() => {
    getCabang();
  }, []);

  console.log(cabang);

  const filteredBranches = cabang.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">KELOLA CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Cabang"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NavLink
              to={"/cabang/add-cabang"}
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
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch, index) => (
                  <tr key={branch.id}>
                    <td>{index + 1}</td>
                    <td>{branch.name}</td>
                    <td>{branch.address}</td>
                    <td>{branch.status == true ? "Aktif" : "Nonaktif"}</td>
                    <td className="flex gap-2">
                      <NavLink
                        to={`/cabang/${branch.id}`}
                        className="btn btn-sm btn-info"
                        title="View"
                      >
                        👁
                      </NavLink>
                      <NavLink
                        to={`/cabang/edit/${branch.id}`}
                        className="btn btn-sm btn-warning"
                        title="Edit"
                      >
                        ✏️
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cabang;

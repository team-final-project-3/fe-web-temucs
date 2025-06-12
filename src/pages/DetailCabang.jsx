import React from "react";
import Layout from "../components/Layout";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { NavLink } from "react-router-dom";

const DetailCabang = () => {
  const detailBranchData = [
    {
      id: 1,
      name: "Windah Batubara",
      cabang: "KCU JAKARTA KOTA",
      role: "CS",
      updatedDate: "01/01/1990",
    },
    {
      id: 2,
      name: "Suisei Hoshimachi",
      cabang: "KCU JAKARTA KOTA",
      role: "LOKET",
      updatedDate: "01/01/1990",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">DETAIL CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <h2 className="text-2xl font-semibold my-3 text-center">
            KCU JAKARTA KOTA
          </h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="w-40 font-semibold">Nama Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">KCU JAKARTA KOTA</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Lokasi Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">Jl. Lada No.1, Jakarta.</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Longitude Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">-6.1498488</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Latitude Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">106.8187305</span>
            </div>
          </div>

          <div className="maps my-10">
            <GoogleMapComponent latitude={-6.1498488} longitude={106.8187305} />
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="w-1/3"></div>

            <div className="w-1/3 text-center">
              <h2 className="text-lg font-semibold">CS/LOKET</h2>
            </div>

            <div className="w-1/3 flex justify-end">
              <NavLink
                to={"/cabang/detail-cabang/add-cs"}
                className="btn bg-orange-500 text-white hover:bg-orange-600"
              >
                + Add CS
              </NavLink>
            </div>
          </div>

          <div className="my-10 border-2 border-gray-200 rounded-lg">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {detailBranchData.map((branch, index) => (
                    <tr key={branch.id}>
                      <td>{index + 1}</td>
                      <td>{branch.name}</td>
                      <td>{branch.cabang}</td>
                      <td>{branch.role}</td>
                      <td>{branch.updatedDate}</td>
                      <td className="flex gap-2">
                        <NavLink
                          to={"/cabang/detail-cabang/edit-cs-loket"}
                          className="btn btn-sm btn-warning"
                          title="Edit"
                        >
                          ✏️
                        </NavLink>
                        {branch.role == "CS" && (
                          <button
                            className="btn btn-sm btn-error"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailCabang;

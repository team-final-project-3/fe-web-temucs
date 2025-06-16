import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { NavLink, useParams } from "react-router-dom";
import api from "../utils/api";

const DetailCabang = () => {
  const [branchDetail, setBranchDetail] = useState("");
  const [listCS, setListCS] = useState([]);
  const [listLoket, setListLoket] = useState([]);

  const { id } = useParams();
  const numericId = parseInt(id, 10);

  console.log(id);

  console.log(numericId);

  const getBranchDetail = async () => {
    const response = await api.get(`/branch/${numericId}`);
    setBranchDetail(response.data.branch);
    setListCS(response.data.branch.cs);
    setListLoket(response.data.branch.lokets);
  };

  useEffect(() => {
    getBranchDetail();
  }, []);

  console.log(branchDetail);
  console.log(listCS);
  console.log(listLoket);

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">DETAIL CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <h2 className="text-2xl font-semibold my-3 text-center">
            {branchDetail.name}
          </h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="w-40 font-semibold">Nama Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">{branchDetail.name}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Lokasi Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">{branchDetail.address}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Longitude Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">{branchDetail.longitude}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Latitude Cabang</span>
              <span className="w-4">:</span>
              <span className="flex-1">{branchDetail.latitude}</span>
            </div>
          </div>

          <div className="maps my-10">
            <GoogleMapComponent
              latitude={branchDetail.latitude}
              longitude={branchDetail.longitude}
            />
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="w-1/3"></div>

            <div className="w-1/3 text-center">
              <h2 className="text-lg font-semibold">KELOLA LOKET</h2>
            </div>

            <div className="w-1/3 flex justify-end">
              <NavLink
                to={`/cabang/${id}/add-loket`}
                className="btn bg-orange-500 text-white hover:bg-orange-600"
              >
                + Add Loket
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
                    <th>Username</th>
                    <th>Created By</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listLoket && listLoket.length > 0 ? (
                    listLoket.map((loket, index) => (
                      <tr key={loket.id}>
                        <td>{index + 1}</td>
                        <td>{loket.name}</td>
                        <td>{loket.username}</td>
                        <td>{loket.createdBy}</td>
                        <td>{loket.createdAt}</td>
                        <td className="flex gap-2">
                          <NavLink
                            to={`/cabang/${id}/edit-loket`}
                            className="btn btn-sm btn-warning"
                            title="Edit"
                          >
                            ✏️
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="w-1/3"></div>

            <div className="w-1/3 text-center">
              <h2 className="text-lg font-semibold">KELOLA CS</h2>
            </div>

            <div className="w-1/3 flex justify-end">
              <NavLink
                to={`/cabang/${id}/add-cs`}
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
                    <th>Username</th>
                    <th>Created By</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listCS && listCS.length > 0 ? (
                    listCS.map((cs, index) => (
                      <tr key={cs.id}>
                        <td>{index + 1}</td>
                        <td>{cs.name}</td>
                        <td>{cs.username}</td>
                        <td>{cs.createdBy}</td>
                        <td>{cs.createdAt}</td>
                        <td className="flex gap-2">
                          <NavLink
                            to={`/cabang/${id}/edit-cs`}
                            className="btn btn-sm btn-warning"
                            title="Edit"
                          >
                            ✏️
                          </NavLink>
                          <button
                            className="btn btn-sm btn-error"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
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

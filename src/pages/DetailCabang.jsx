import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const DetailCabang = () => {
  const [branchDetail, setBranchDetail] = useState("");
  const [listCS, setListCS] = useState([]);
  const [listLoket, setListLoket] = useState([]);
  const [selectedCS, setSelectedCS] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id, 10);

  useEffect(() => {
    if (!/^\d+$/.test(id)) {
      navigate("/not-found");
    }
  }, [id, navigate]);

  const getBranchDetail = async () => {
    try {
      const response = await api.get(`/branch/${numericId}`);
      setBranchDetail(response.data.branch);
      setListCS(response.data.branch.cs);
      setListLoket(response.data.branch.lokets);
    } catch (error) {
      console.error("Gagal mengambil detail cabang:", error);
      alert("Cabang tidak ditemukan atau terjadi kesalahan.");
      navigate("/cabang");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBranchDetail();
  }, []);

  const confirmDeleteCS = (cs) => {
    setSelectedCS(cs);
    setShowModal(true);
  };

  const handleSoftDeleteCS = async () => {
    try {
      await api.put(`/cs/${selectedCS.id}/status`);
      setShowModal(false);
      setSelectedCS(null);
      getBranchDetail();
    } catch (error) {
      console.error("Delete CS error:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">DETAIL CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          {loading ? (
            <div className="text-center py-10 font-medium text-gray-600">
              Loading...
            </div>
          ) : (
            <>
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
                <div className="w-1/3" />
                <div className="w-1/3 text-center">
                  <h2 className="text-lg font-semibold">KELOLA LOKET</h2>
                </div>
                <div className="w-1/3 flex justify-end">
                  {listLoket.length < 1 ? (
                    <NavLink
                      to={`/cabang/${id}/add-loket`}
                      className="btn bg-orange-500 text-white hover:bg-orange-600"
                    >
                      + Add Loket
                    </NavLink>
                  ) : (
                    <button
                      className="btn bg-gray-400 text-white cursor-not-allowed"
                      disabled
                    >
                      + Add Loket
                    </button>
                  )}
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
                      {listLoket.length > 0 ? (
                        listLoket.map((loket, index) => (
                          <tr key={loket.id}>
                            <td>{index + 1}</td>
                            <td>{loket.name}</td>
                            <td>{loket.username}</td>
                            <td>{loket.createdBy}</td>
                            <td>
                              {new Date(loket.createdAt).toLocaleString()}
                            </td>
                            <td>
                              <NavLink
                                to={`/cabang/${id}/edit-loket/${loket.id}`}
                                className="btn btn-sm btn-warning"
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
                <div className="w-1/3" />
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
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listCS.length > 0 ? (
                        listCS.map((cs, index) => (
                          <tr key={cs.id}>
                            <td>{index + 1}</td>
                            <td>{cs.name}</td>
                            <td>{cs.username}</td>
                            <td>{cs.status ? "Aktif" : "Nonaktif"}</td>
                            <td>{cs.createdBy}</td>
                            <td>{new Date(cs.createdAt).toLocaleString()}</td>
                            <td className="flex gap-2">
                              <NavLink
                                to={`/cabang/${id}/edit-cs/${cs.id}`}
                                className="btn btn-sm btn-warning"
                              >
                                ✏️
                              </NavLink>
                              <button
                                className={`btn btn-sm ${
                                  cs.status ? "btn-error" : "btn-success"
                                }`}
                                onClick={() => confirmDeleteCS(cs)}
                              >
                                {cs.status ? "🗑️" : "✅"}
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
            </>
          )}
        </div>

        {showModal && selectedCS && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Konfirmasi Hapus
              </h3>
              <p>
                Apakah kamu yakin ingin{" "}
                <strong>
                  {selectedCS.status ? "menonaktifkan" : "mengaktifkan"}
                </strong>{" "}
                CS <strong>{selectedCS.name}</strong>?
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleSoftDeleteCS}
                  className="btn btn-sm btn-error"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailCabang;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import api from "../utils/api";

const EditCabang = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchCabang = async () => {
      try {
        const res = await api.get(`/branch/${id}`);
        const data = res.data.branch;
        console.log(data);

        setNama(data.name || "");
        setBranchCode(data.branchCode || "");
        setAddress(data.address || "");
        setLongitude(data.longitude?.toString() || "");
        setLatitude(data.latitude?.toString() || "");
        setStatus(data.status || "");
      } catch (error) {
        console.error("Gagal memuat data cabang:", error);
      }
    };

    fetchCabang();
  }, [id]);

  const handleUpdateCabang = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: nama,
        branchCode,
        address,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        status: status === "true",
        updatedBy: localStorage.getItem("username"),
      };

      await api.put(`/branch/${id}`, updatedData);
      navigate("/cabang");
    } catch (error) {
      console.error("Gagal memperbarui cabang:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Cabang</label>
            <input
              type="text"
              className="input w-full"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <label className="label">Kode Cabang</label>
            <input
              type="text"
              className="input w-full"
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
            />
            <label className="label">Lokasi Cabang</label>
            <input
              type="text"
              className="input w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="label">Longitude Cabang</label>
            <input
              type="text"
              className="input w-full"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <label className="label">Latitude Cabang</label>
            <input
              type="text"
              className="input w-full"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <label className="label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select w-full"
            >
              <option value="" disabled>
                Status Cabang
              </option>
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </select>

            <div className="flex justify-center gap-5">
              <NavLink
                to={"/cabang"}
                className="btn bg-white border-orange-500 mt-6 text-orange-300 font-semibold"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleUpdateCabang}
                className="btn bg-orange-500 mt-6 text-white font-semibold"
              >
                Simpan
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default EditCabang;

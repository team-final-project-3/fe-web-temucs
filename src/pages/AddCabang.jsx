import React, { useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";

const AddCabang = () => {
  const [nama, setNama] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const navigate = useNavigate();

  const handleAddCabang = async (e) => {
    e.preventDefault();
    try {
      const dataCabang = {
        name: nama,
        branchCode,
        address,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        holiday: false,
        status: true,
        createdBy: localStorage.getItem("username"),
        updatedBy: localStorage.getItem("username"),
      };
      const response = await api.post("/branch", dataCabang);
      setNama("");
      setBranchCode("");
      setAddress("");
      setLongitude("");
      setLatitude("");
      console.log(response.data);
      navigate("/cabang");
    } catch (error) {
      console.error(error);
      // tambahin modal
    }
  };
  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Cabang"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <label className="label">Kode Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Kode Cabang"
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
            />
            <label className="label">Lokasi Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Lokasi Cabang"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="label">Latitude Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Latitude Cabang"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <label className="label">Longitude Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Longitude Cabang"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <div className="flex justify-center gap-5">
              <NavLink
                to={"/cabang"}
                className="btn bg-white border-orange-500 mt-6 text-orange-300 font-semibold"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleAddCabang}
                className="btn bg-orange-500 mt-6 text-white font-semibold"
              >
                Tambah
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default AddCabang;

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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const hasNoSpaces = (value) => /^\S+$/.test(value);
  const isNumeric = (value) => !isNaN(value) && value.trim() !== "";

  const handleAddCabang = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!nama.trim()) newErrors.nama = "Field Nama Cabang harus diisi";
    if (!branchCode.trim()) {
      newErrors.branchCode = "Field Kode Cabang harus diisi";
    } else if (!hasNoSpaces(branchCode)) {
      newErrors.branchCode = "Tidak boleh mengandung spasi";
    }
    if (!address.trim()) newErrors.address = "Field Lokasi harus diisi";

    if (!latitude.trim()) {
      newErrors.latitude = "Field Latitude harus diisi";
    } else if (!isNumeric(latitude)) {
      newErrors.latitude = "Latitude harus berupa angka";
    }

    if (!longitude.trim()) {
      newErrors.longitude = "Field Longitude harus diisi";
    } else if (!isNumeric(longitude)) {
      newErrors.longitude = "Longitude harus berupa angka";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const dataCabang = {
        name: nama.trim().replace(/\s{2,}/g, " "),
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
      navigate("/cabang");
    } catch (error) {
      console.error("Gagal menambahkan cabang:", error);
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
              className={`input w-full ${errors.nama ? "border-red-500" : ""}`}
              placeholder="Nama Cabang"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value.replace(/^\s+/, ""));
                setErrors((prev) => ({ ...prev, nama: "" }));
              }}
            />
            {errors.nama && (
              <span className="text-sm text-red-500">{errors.nama}</span>
            )}

            <label className="label mt-4">Kode Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.branchCode ? "border-red-500" : ""
              }`}
              placeholder="Kode Cabang"
              value={branchCode}
              onChange={(e) => {
                setBranchCode(e.target.value);
                setErrors((prev) => ({ ...prev, branchCode: "" }));
              }}
              onKeyDown={(e) => e.key === " " && e.preventDefault()}
            />
            {errors.branchCode && (
              <span className="text-sm text-red-500">{errors.branchCode}</span>
            )}

            <label className="label mt-4">Lokasi Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.address ? "border-red-500" : ""
              }`}
              placeholder="Lokasi Cabang"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors((prev) => ({ ...prev, address: "" }));
              }}
            />
            {errors.address && (
              <span className="text-sm text-red-500">{errors.address}</span>
            )}

            <label className="label mt-4">Latitude Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.latitude ? "border-red-500" : ""
              }`}
              placeholder="Latitude Cabang"
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
                setErrors((prev) => ({ ...prev, latitude: "" }));
              }}
            />
            {errors.latitude && (
              <span className="text-sm text-red-500">{errors.latitude}</span>
            )}

            <label className="label mt-4">Longitude Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.longitude ? "border-red-500" : ""
              }`}
              placeholder="Longitude Cabang"
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
                setErrors((prev) => ({ ...prev, longitude: "" }));
              }}
            />
            {errors.longitude && (
              <span className="text-sm text-red-500">{errors.longitude}</span>
            )}

            <div className="flex justify-center gap-5">
              <NavLink
                to="/cabang"
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

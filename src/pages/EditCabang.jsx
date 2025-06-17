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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCabang = async () => {
      try {
        const res = await api.get(`/branch/${id}`);
        const data = res.data.branch;

        setNama(data.name || "");
        setBranchCode(data.branchCode || "");
        setAddress(data.address || "");
        setLongitude(data.longitude?.toString() || "");
        setLatitude(data.latitude?.toString() || "");
      } catch (error) {
        console.error("Gagal memuat data cabang:", error);
      }
    };

    fetchCabang();
  }, [id]);

  const handleUpdateCabang = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!nama.trim()) newErrors.nama = "Nama cabang wajib diisi";
    if (!branchCode.trim()) newErrors.branchCode = "Kode cabang wajib diisi";
    if (!address.trim()) newErrors.address = "Alamat cabang wajib diisi";

    if (!longitude.trim()) {
      newErrors.longitude = "Longitude wajib diisi";
    } else if (isNaN(parseFloat(longitude))) {
      newErrors.longitude = "Longitude harus berupa angka";
    }

    if (!latitude.trim()) {
      newErrors.latitude = "Latitude wajib diisi";
    } else if (isNaN(parseFloat(latitude))) {
      newErrors.latitude = "Latitude harus berupa angka";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedData = {
        name: nama.trim(),
        branchCode: branchCode.trim(),
        address: address.trim(),
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        updatedBy: localStorage.getItem("username"),
      };

      await api.put(`/branch/${id}`, updatedData);
      navigate("/cabang");
    } catch (error) {
      console.error("Gagal memperbarui cabang:", error);
      alert("Terjadi kesalahan saat memperbarui cabang.");
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
              className={`input w-full ${errors.nama ? "border-red-500" : ""}`}
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                setErrors((prev) => ({ ...prev, nama: "" }));
              }}
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama}</p>
            )}

            <label className="label">Kode Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.branchCode ? "border-red-500" : ""
              }`}
              value={branchCode}
              onChange={(e) => {
                setBranchCode(e.target.value);
                setErrors((prev) => ({ ...prev, branchCode: "" }));
              }}
            />
            {errors.branchCode && (
              <p className="text-red-500 text-sm">{errors.branchCode}</p>
            )}

            <label className="label">Lokasi Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.address ? "border-red-500" : ""
              }`}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors((prev) => ({ ...prev, address: "" }));
              }}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}

            <label className="label">Longitude Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.longitude ? "border-red-500" : ""
              }`}
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
                setErrors((prev) => ({ ...prev, longitude: "" }));
              }}
            />
            {errors.longitude && (
              <p className="text-red-500 text-sm">{errors.longitude}</p>
            )}

            <label className="label">Latitude Cabang</label>
            <input
              type="text"
              className={`input w-full ${
                errors.latitude ? "border-red-500" : ""
              }`}
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
                setErrors((prev) => ({ ...prev, latitude: "" }));
              }}
            />
            {errors.latitude && (
              <p className="text-red-500 text-sm">{errors.latitude}</p>
            )}

            <div className="flex justify-center gap-5">
              <NavLink
                to="/cabang"
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

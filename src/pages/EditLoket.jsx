import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const EditLoket = () => {
  const { branchId, loketId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // <--- Tambahkan state loading

  useEffect(() => {
    const getLoketDetail = async () => {
      try {
        const response = await api.get(`/branch/${branchId}`);
        const loket = response.data.branch.lokets.find(
          (l) => l.id === parseInt(loketId)
        );

        if (loket) {
          setName(loket.name);
          setUsername(loket.username);
        } else {
          console.warn("Data loket tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal mengambil detail loket:", err);
      }
    };

    getLoketDetail();
  }, [branchId, loketId]);

  const hasNoSpaces = (value) => /^\S+$/.test(value);

  const handleEditLoket = async () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Field Name harus diisi";

    if (!username.trim()) {
      newErrors.username = "Field Username harus diisi";
    } else if (!hasNoSpaces(username)) {
      newErrors.username = "Tidak boleh mengandung spasi";
    }

    if (password && !hasNoSpaces(password)) {
      newErrors.password = "Tidak boleh mengandung spasi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Mulai loading

    try {
      const payload = {
        name: name.trimEnd().replace(/\s{2,}/g, " "),
        username,
        updatedBy: "admin",
      };

      if (password) payload.password = password;

      await api.put(`/loket/${loketId}`, payload);
      navigate(`/cabang/${branchId}`);
    } catch (error) {
      console.error("Gagal update loket:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      setErrors((prev) => ({ ...prev, backend: errorMessage }));
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT LOKET</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama</label>
            <input
              type="text"
              className={`input w-full ${errors.name ? "border-red-500" : ""}`}
              placeholder="Nama"
              value={name}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/^\s+/, "")
                  .replace(/\s{2,}/g, " ");
                setName(value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}

            <label className="label mt-4">Username</label>
            <input
              type="text"
              className={`input w-full ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username}</span>
            )}

            <label className="label mt-4">Password (opsional)</label>
            <input
              type="password"
              className={`input w-full ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Kosongkan jika tidak ingin mengganti"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}

            {errors.backend && (
              <div className="text-center text-red-600 font-medium mt-4">
                {errors.backend}
              </div>
            )}

            <div className="flex justify-center gap-5 pt-4">
              <NavLink
                to={`/cabang/${branchId}`}
                className="btn bg-white border-orange-500 text-orange-500 hover:bg-orange-100"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleEditLoket}
                disabled={loading}
                className={`btn text-white font-semibold ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {loading ? (
                  <>
                    Memproses...
                    <span className="loading loading-spinner loading-sm ml-2"></span>
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default EditLoket;

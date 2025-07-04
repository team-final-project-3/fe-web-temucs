import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const EditCS = () => {
  const { branchId, csId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!/^\d+$/.test(csId)) {
      navigate("/not-found");
    }
  }, [csId, navigate]);

  const hasNoSpaces = (value) => /^\S+$/.test(value);

  const getCSDetail = async () => {
    try {
      const response = await api.get(`/branch/${branchId}`);
      const cs = response.data.branch.cs.find((l) => l.id === parseInt(csId));

      if (cs) {
        setName(cs.name);
        setUsername(cs.username);
      } else {
        console.warn("Data cs tidak ditemukan.");
      }
    } catch (err) {
      console.error("Gagal mengambil detail cs:", err);
    }
  };

  useEffect(() => {
    getCSDetail();
  }, []);

  const handleEditCS = async () => {
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

    setLoading(true);

    try {
      const payload = {
        name: name.trimEnd().replace(/\s{2,}/g, " "),
        username,
        updatedBy: "admin",
      };

      if (password) payload.password = password;

      await api.put(`/cs/${csId}`, payload);
      navigate(`/cabang/${branchId}`);
    } catch (error) {
      console.error("Gagal update cs:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      setErrors((prev) => ({ ...prev, backend: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">EDIT CS</h2>

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

            <label className="label">Username</label>
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

            <label className="label">Password (opsional)</label>
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
                onClick={handleEditCS}
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

export default EditCS;

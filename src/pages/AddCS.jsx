import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const AddCS = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const hasNoSpaces = (value) => /^\S+$/.test(value);

  const handleAddCS = async () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Field Nama harus diisi";

    if (!username.trim()) {
      newErrors.username = "Field Username harus diisi";
    } else if (!hasNoSpaces(username)) {
      newErrors.username = "Tidak boleh mengandung spasi";
    }

    if (!password.trim()) {
      newErrors.password = "Field Password harus diisi";
    } else if (!hasNoSpaces(password)) {
      newErrors.password = "Tidak boleh mengandung spasi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        branchId: numericId,
        name: name.trimEnd().replace(/\s{2,}/g, " "),
        username,
        password,
        createdBy: localStorage.getItem("username"),
      };

      const response = await api.post("/cs/add", payload);
      navigate(`/cabang/${numericId}`);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal menambahkan CS:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD CUSTOMER SERVICE</h2>

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

            <label className="label mt-4">Password</label>
            <input
              type="password"
              className={`input w-full ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Password"
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

            <div className="flex justify-center gap-5">
              <NavLink
                to={`/cabang/${numericId}`}
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleAddCS}
                className="btn bg-orange-500 mt-4 text-white font-semibold"
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

export default AddCS;

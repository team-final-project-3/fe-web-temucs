import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const EditLoket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branchId, setBranchId] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getLoketDetail = async () => {
    try {
      const response = await api.get(`/cabang/${id}`);
      console.log(response.data);

      const data = response.data[0].loket;
      setBranchId(data.branchId);
      setName(data.name);
      setUsername(data.username);
    } catch (err) {
      console.error("Gagal mengambil detail loket:", err);
    }
  };

  useEffect(() => {
    getLoketDetail();
  }, []);

  const handleEditLoket = async () => {
    try {
      if (!name || !username) {
        alert("Nama dan Username wajib diisi.");
        return;
      }

      const payload = {
        name,
        username,
        updatedBy: localStorage.getItem("username"),
      };

      if (password) payload.password = password;

      await api.put(`/loket/${id}`, payload);
      navigate(`/cabang/${branchId}`);
    } catch (err) {
      console.error("Gagal update loket:", err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT LOKET</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4 space-y-3">
            <label className="label">Nama</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="label">Username</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label">Password (opsional)</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Kosongkan jika tidak ingin mengganti"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center gap-5 pt-4">
              <NavLink
                to={`/cabang/${branchId}`}
                className="btn bg-white border-orange-500 text-orange-500 hover:bg-orange-100"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleEditLoket}
                className="btn bg-orange-500 text-white hover:bg-orange-600"
              >
                Simpan Perubahan
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default EditLoket;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const AddLoket = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  console.log(id);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAddLoket = async () => {
    const response = await api.post("/loket/add", {
      branchId: numericId,
      name,
      username,
      password,
      createdBy: "admin",
    });

    navigate(`/cabang/${numericId}`);
    console.log(response.data);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD LOKET</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
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
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center gap-5">
              <NavLink
                to={`/cabang/${numericId}`}
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleAddLoket}
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

export default AddLoket;

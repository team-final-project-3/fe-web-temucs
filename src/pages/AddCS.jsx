import React from "react";
import Layout from "../components/Layout";

const AddCS = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD COSTUMER SERVICE</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama</label>
            <input type="text" className="input w-full" placeholder="Nama" />
            <label className="label">Username</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Username"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
            />

            <div className="flex justify-center gap-5">
              <button className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold">
                Batalkan
              </button>
              <button className="btn bg-orange-500 mt-4 text-white font-semibold">
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

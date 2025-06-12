import React from "react";
import Layout from "../components/Layout";

const EditLayanan = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT LAYANAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Layanan</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Layanan"
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

export default EditLayanan;

import React from "react";
import Layout from "../components/Layout";

const EditCabang = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT CABANG</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Cabang"
            />
            <label className="label">Lokasi Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Lokasi Cabang"
            />
            <label className="label">Longitude Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Longitude Cabang"
            />
            <label className="label">Latitude Cabang</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Latitude Cabang"
            />
            <div className="flex justify-center gap-5">
              <button className="btn bg-white border-orange-500 mt-6 text-orange-300 font-semibold">
                Batalkan
              </button>
              <button className="btn bg-orange-500 mt-6 text-white font-semibold">
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

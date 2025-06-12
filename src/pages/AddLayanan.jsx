import React from "react";
import Layout from "../components/Layout";

const AddLayanan = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD LAYANAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Layanan</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Layanan"
            />
            <div className="mb-4">
              <label className="label mb-2">Dokumen Terkait</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-warning"
                  />
                  <span>KTP</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-warning"
                  />
                  <span>KK</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span>NPWP</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span>BA Polisi</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span>BA</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span>SIM</span>
                </label>
              </div>
            </div>

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

export default AddLayanan;

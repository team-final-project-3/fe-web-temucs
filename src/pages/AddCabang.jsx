import React from "react";
import Layout from "../components/Layout";

const AddCabang = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD CABANG</h2>

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
          </fieldset>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          ADD COSTUMER SERVICE
        </h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Costumer Service</label>
            <input type="text" className="input w-full" placeholder="Nama CS" />
            <label className="label">Username Costumer Service</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Username CS"
            />
            <label className="label">Password Costumer Service</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password CS"
            />
          </fieldset>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-3">ADD LOKET</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Loket</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Loket"
            />
            <label className="label">Username Loket</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Username Loket"
            />
            <label className="label">Password Loket</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password Loket"
            />
          </fieldset>
        </div>

        <div className="flex justify-center gap-5">
          <button className="btn bg-white border-orange-500 mt-6 text-orange-300 font-semibold">
            Batalkan
          </button>
          <button className="btn bg-orange-500 mt-6 text-white font-semibold">
            Tambah
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddCabang;

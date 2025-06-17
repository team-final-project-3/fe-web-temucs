import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "cally";

const EditLibur = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const res = await api.get(`/holiday/${id}`);
        const { holidayName, date } = res.data.data;
        setName(holidayName);
        setDate(date);

        const button = document.getElementById("cally1");
        if (button) button.innerText = date;
      } catch (error) {
        console.error("Gagal mengambil data libur:", error);
      }
    };

    fetchHoliday();
  }, [id]);

  useEffect(() => {
    const calendar = document.querySelector("calendar-date");
    const button = document.getElementById("cally1");

    if (calendar && button) {
      calendar.onchange = function () {
        const val = this.value;
        setDate(val);
        button.innerText = val;
      };
    }
  }, []);

  const handleUpdateHoliday = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/holiday/${id}`, {
        holidayName: name,
        date,
        updatedBy: "admin",
      });
      console.log("Berhasil update:", response.data);
      navigate("/libur");
    } catch (error) {
      console.error("Gagal update:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">Edit Libur</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Hari Libur</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Libur"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="label mt-4">Tanggal Hari Libur</label>
            <button
              popoverTarget="cally-popover1"
              className="input input-bordered cursor-pointer w-full"
              id="cally1"
              style={{ anchorName: "--cally1" }}
            >
              {date || "Pilih Tanggal Libur"}
            </button>

            <div
              popover="manual"
              id="cally-popover1"
              className="dropdown bg-base-100 rounded-box shadow-lg p-2"
              style={{ positionAnchor: "--cally1" }}
            >
              <calendar-date class="cally">
                <svg
                  aria-label="Previous"
                  className="fill-current size-4"
                  slot="previous"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <svg
                  aria-label="Next"
                  className="fill-current size-4"
                  slot="next"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <calendar-month></calendar-month>
              </calendar-date>
            </div>

            <div className="flex justify-center gap-5">
              <button
                className="btn bg-white border-orange-500 mt-6 text-orange-300 font-semibold"
                onClick={() => navigate("/libur")}
              >
                Batalkan
              </button>
              <button
                className="btn bg-orange-500 mt-6 text-white font-semibold"
                onClick={handleUpdateHoliday}
              >
                Simpan
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default EditLibur;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "cally";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddLibur = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calendar = document.querySelector("calendar-date");
    const button = document.getElementById("cally1");

    if (calendar && button) {
      const today = new Date().toISOString().split("T")[0];
      calendar.setAttribute("min", today);

      calendar.onchange = function () {
        const val = this.value;
        setDate(val);
        button.innerText = this.value;
        setErrors((prev) => ({ ...prev, date: "" }));
      };
    }
  }, []);

  const normalizeName = (name) => name.trim().replace(/\s{2,}/g, " ");

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const cleanedName = normalizeName(name);

    if (!cleanedName) newErrors.name = "Nama hari libur harus diisi";
    if (!date) newErrors.date = "Tanggal hari libur harus dipilih";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get("/holiday");

      const exists = response.data.holidays.find((item) => {
        const itemDate = item.date?.split("T")[0];
        return (
          item.holidayName?.toLowerCase() === cleanedName.toLowerCase() &&
          itemDate === date
        );
      });

      if (exists) {
        setErrors({
          name: "Data hari libur sudah terdaftar",
        });
        setLoading(false);
        return;
      }

      await api.post("/holiday", {
        holidayName: cleanedName,
        date,
        createdBy: "admin",
        updatedBy: "admin",
      });

      navigate("/libur");
    } catch (error) {
      console.error("Gagal menambahkan hari libur:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      setErrors((prev) => ({ ...prev, backend: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">Add Libur</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Hari Libur</label>
            <input
              type="text"
              className={`input w-full ${errors.name ? "border-red-500" : ""}`}
              placeholder="Nama Libur"
              value={name}
              onChange={(e) => {
                setName(e.target.value.replace(/^\s+/, ""));
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              onBlur={(e) => setName(normalizeName(e.target.value))}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}

            <label className="label mt-4">Tanggal Hari Libur</label>
            <button
              popoverTarget="cally-popover1"
              className={`input input-bordered cursor-pointer w-full text-left ${
                errors.date ? "border-red-500" : ""
              }`}
              id="cally1"
              style={{ anchorName: "--cally1" }}
            >
              {date || "Pilih Tanggal Libur"}
            </button>
            {errors.date && (
              <span className="text-sm text-red-500">{errors.date}</span>
            )}

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

            {errors.backend && (
              <div className="text-center text-red-600 font-medium mt-4">
                {errors.backend}
              </div>
            )}

            <div className="flex justify-center gap-5">
              <button
                type="button"
                className="btn bg-white border-orange-500 mt-6 text-orange-300 font-semibold"
                onClick={() => {
                  setName("");
                  setDate("");
                  setErrors({});
                  document.getElementById("cally1").innerText =
                    "Pilih Tanggal Libur";
                }}
              >
                Batalkan
              </button>
              <button
                onClick={handleAddHoliday}
                disabled={loading}
                className={`btn mt-6 text-white font-semibold ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {loading ? (
                  <>
                    Menyimpan...
                    <span className="loading loading-spinner loading-sm ml-2"></span>
                  </>
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default AddLibur;

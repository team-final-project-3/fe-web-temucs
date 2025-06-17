import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddLayanan = () => {
  const [serviceName, setServiceName] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/document");
        setDocuments(response.data);
      } catch (error) {
        console.error("Gagal mengambil dokumen:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
    setErrors((prev) => ({ ...prev, selectedDocuments: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!serviceName.trim()) newErrors.serviceName = "Nama layanan harus diisi";

    const parsedTime = parseInt(estimateTime);
    if (!estimateTime.trim()) {
      newErrors.estimateTime = "Estimasi waktu harus diisi";
    } else if (isNaN(parsedTime) || parsedTime <= 0) {
      newErrors.estimateTime = "Harus berupa angka lebih dari 0";
    }

    if (selectedDocuments.length === 0) {
      newErrors.selectedDocuments = "Pilih minimal satu dokumen";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      serviceName: serviceName.trimEnd().replace(/\s{2,}/g, " "),
      estimatedTime: parsedTime,
      documentIds: selectedDocuments,
    };

    try {
      const response = await api.post("/service", payload);
      setServiceName("");
      setEstimateTime("");
      setSelectedDocuments([]);
      navigate("/layanan");
    } catch (error) {
      console.error("Gagal menambahkan layanan:", error);
      alert("Terjadi kesalahan saat menambahkan layanan.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">ADD LAYANAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Layanan</label>
            <input
              type="text"
              className={`input w-full mb-1 ${
                errors.serviceName ? "border-red-500" : ""
              }`}
              placeholder="Nama Layanan"
              value={serviceName}
              onChange={(e) => {
                setServiceName(e.target.value);
                setErrors((prev) => ({ ...prev, serviceName: "" }));
              }}
            />
            {errors.serviceName && (
              <span className="text-sm text-red-500">{errors.serviceName}</span>
            )}

            <label className="label mt-4">Estimasi Waktu (menit)</label>
            <input
              type="number"
              className={`input w-full mb-1 ${
                errors.estimateTime ? "border-red-500" : ""
              }`}
              placeholder="Contoh: 15"
              value={estimateTime}
              onChange={(e) => {
                setEstimateTime(e.target.value);
                setErrors((prev) => ({ ...prev, estimateTime: "" }));
              }}
            />
            {errors.estimateTime && (
              <span className="text-sm text-red-500">
                {errors.estimateTime}
              </span>
            )}

            <div className="mb-4">
              <label className="label mb-2">Dokumen Terkait</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {documents.map((doc) => (
                  <label key={doc.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-warning"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => handleCheckboxChange(doc.id)}
                    />
                    <span>{doc.documentName}</span>
                  </label>
                ))}
              </div>
              {errors.selectedDocuments && (
                <span className="text-sm text-red-500">
                  {errors.selectedDocuments}
                </span>
              )}
            </div>

            <div className="flex justify-center gap-5">
              <button
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
                onClick={() => {
                  setServiceName("");
                  setEstimateTime("");
                  setSelectedDocuments([]);
                  setErrors({});
                }}
              >
                Batalkan
              </button>
              <button
                className="btn bg-orange-500 mt-4 text-white font-semibold"
                onClick={handleSubmit}
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

export default AddLayanan;

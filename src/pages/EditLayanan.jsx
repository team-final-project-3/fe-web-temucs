import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const EditLayanan = () => {
  const [serviceName, setServiceName] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDocuments = async () => {
    try {
      const response = await api.get("/document");
      setDocuments(response.data);
    } catch (error) {
      console.error("Gagal mengambil dokumen:", error);
    }
  };

  const fetchServiceDetail = async () => {
    try {
      const response = await api.get(`/service/${id}`);
      const data = response.data;
      setServiceName(data.serviceName);
      setEstimateTime(data.estimatedTime);
      setSelectedDocuments(data.documents.map((doc) => doc.id));
    } catch (error) {
      console.error("Gagal mengambil detail layanan:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchServiceDetail();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const payload = {
      serviceName,
      estimatedTime: parseInt(estimateTime),
      documentIds: selectedDocuments,
      updatedBy: "admin",
    };

    try {
      await api.put(`/service/${id}`, payload);
      navigate("/layanan");
    } catch (error) {
      console.error("Gagal mengupdate layanan:", error);
      alert("Terjadi kesalahan saat mengupdate layanan.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT LAYANAN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Layanan</label>
            <input
              type="text"
              className="input w-full mb-4"
              placeholder="Nama Layanan"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />

            <label className="label">Estimasi Waktu (menit)</label>
            <input
              type="number"
              className="input w-full mb-4"
              placeholder="Contoh: 15"
              value={estimateTime}
              onChange={(e) => setEstimateTime(e.target.value)}
            />

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
            </div>

            <div className="flex justify-center gap-5">
              <button
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
                onClick={() => navigate("/layanan")}
              >
                Batalkan
              </button>
              <button
                className="btn bg-orange-500 mt-4 text-white font-semibold"
                onClick={handleSubmit}
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

export default EditLayanan;

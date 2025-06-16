import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const EditDokumen = () => {
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data dokumen berdasarkan ID
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/document/${id}`);
        setDocument(response.data.documentName || ""); // asumsi field bernama documentName
      } catch (error) {
        console.error("Gagal mengambil data dokumen:", error);
      }
    };

    fetchDocument();
  }, [id]);

  const handleEditDocument = async (e) => {
    e.preventDefault();

    if (!document.trim()) {
      alert("Nama dokumen tidak boleh kosong.");
      return;
    }

    setLoading(true);

    try {
      // Ambil semua dokumen
      const allDocs = await api.get("/document");

      const isDuplicate = allDocs.data.find(
        (doc) =>
          doc.documentName &&
          doc.documentName.toLowerCase() === document.trim().toLowerCase() &&
          doc.id.toString() !== id // pastikan bukan dokumen ini sendiri
      );

      if (isDuplicate) {
        alert("Nama dokumen sudah digunakan oleh dokumen lain.");
        setLoading(false);
        return;
      }

      // Lanjut update
      const updateResponse = await api.put(`/document/${id}`, {
        documentName: document.trim(),
        updatedBy: localStorage.getItem("username") || "Unknown",
        updatedAt: new Date().toISOString(),
      });

      console.log("Dokumen berhasil diperbarui:", updateResponse.data);
      navigate("/dokumen");
    } catch (error) {
      console.error("Gagal memperbarui dokumen:", error);
      alert("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">EDIT DOKUMEN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Dokumen</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Nama Dokumen"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />

            <div className="flex justify-center gap-5">
              <NavLink
                to={"/dokumen"}
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleEditDocument}
                disabled={loading}
                className={`btn mt-4 text-white font-semibold ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500"
                }`}
              >
                {loading ? "Memproses..." : "Simpan"}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default EditDokumen;

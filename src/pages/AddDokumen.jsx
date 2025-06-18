import React, { useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";
import { NavLink, useNavigate } from "react-router-dom";

const AddDokumen = () => {
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const normalizeDocumentName = (name) => name.trim().replace(/\s{2,}/g, " ");

  const handleAddDocument = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const cleanedDocument = normalizeDocumentName(document);

    if (!cleanedDocument) {
      newErrors.documentName = "Field Nama Dokumen harus diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get("/document");

      const existing = response.data.find(
        (doc) =>
          doc.documentName &&
          doc.documentName.toLowerCase() === cleanedDocument.toLowerCase()
      );

      if (existing) {
        newErrors.documentName = "Nama Dokumen sudah ada";
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      const addResponse = await api.post("/document", {
        documentName: cleanedDocument,
        date: Date.now(),
        createdBy: localStorage.getItem("username") || "Unknown",
        updatedBy: localStorage.getItem("username") || "Unknown",
      });

      console.log("Dokumen berhasil ditambahkan:", addResponse.data);
      navigate("/dokumen");
    } catch (error) {
      console.error("Gagal menambahkan dokumen:", error);
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
        <h2 className="text-2xl font-semibold my-3">ADD DOKUMEN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <fieldset className="fieldset rounded-box p-4">
            <label className="label">Nama Dokumen</label>
            <input
              type="text"
              className={`input w-full ${
                errors.documentName ? "border-red-500" : ""
              }`}
              placeholder="Nama Dokumen"
              value={document}
              onChange={(e) => {
                setDocument(e.target.value.replace(/^\s+/, "")); // Hapus spasi di awal
                setErrors((prev) => ({ ...prev, documentName: "" }));
              }}
              onBlur={(e) => setDocument(normalizeDocumentName(e.target.value))}
            />
            {errors.documentName && (
              <span className="text-sm text-red-500">
                {errors.documentName}
              </span>
            )}

            {errors.backend && (
              <div className="text-center text-red-600 font-medium mt-4">
                {errors.backend}
              </div>
            )}

            <div className="flex justify-center gap-5">
              <NavLink
                to={"/dokumen"}
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
              >
                Batalkan
              </NavLink>
              <button
                onClick={handleAddDocument}
                disabled={loading}
                className={`btn mt-4 text-white font-semibold ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500"
                }`}
              >
                {loading ? "Memproses..." : "Tambah"}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default AddDokumen;

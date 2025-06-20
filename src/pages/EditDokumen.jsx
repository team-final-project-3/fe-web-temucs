import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditDokumen = () => {
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const data = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/document/${id}`);
        setDocument(response.data.documentName || "");
      } catch (error) {
        console.error("Gagal mengambil data dokumen:", error);
        setErrors((prev) => ({
          ...prev,
          backend: "Gagal mengambil data dokumen.",
        }));
      }
    };

    fetchDocument();
  }, [id]);

  const handleEditDocument = async (e) => {
    e.preventDefault();
    console.log(id);

    const newErrors = {};

    if (!document.trim()) {
      newErrors.documentName = "Nama dokumen tidak boleh kosong.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const allDocs = await api.get("/document/user");

      const isDuplicate = allDocs.data.find(
        (doc) =>
          doc.documentName &&
          doc.documentName.toLowerCase() === document.trim().toLowerCase() &&
          doc.id.toString() !== id
      );

      if (isDuplicate) {
        newErrors.documentName =
          "Nama dokumen sudah digunakan oleh dokumen lain.";
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      console.log(id);

      const updateResponse = await api.put(`/document/${id}`, {
        documentName: document.trim(),
      });

      console.log("Dokumen berhasil diperbarui:", updateResponse.data);
      navigate("/dokumen");
    } catch (error) {
      console.error("Gagal memperbarui dokumen:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan.";
      setErrors((prev) => ({ ...prev, backend: errorMessage }));
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
              onChange={(e) => {
                setDocument(e.target.value);
                setErrors((prev) => ({ ...prev, documentName: "" }));
              }}
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

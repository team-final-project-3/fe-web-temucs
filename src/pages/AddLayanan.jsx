import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";
import { NavLink, useNavigate } from "react-router-dom";

const AddLayanan = () => {
  const [serviceName, setServiceName] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/document/user");
        setDocuments(response.data);
      } catch (error) {
        console.error("Gagal mengambil dokumen:", error.message);
      }
    };

    fetchDocuments();
  }, []);

  const handleCheckboxChange = (doc) => {
    setSelectedDocuments((prev) => {
      const exists = prev.find((d) => d.documentId === doc.id);
      if (exists) {
        return prev.filter((d) => d.documentId !== doc.id);
      } else {
        return [...prev, { documentId: doc.id, quantity: 1 }];
      }
    });
    setErrors((prev) => ({ ...prev, selectedDocuments: "" }));
  };

  const handleQuantityChange = (docId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setSelectedDocuments((prev) =>
      prev.map((d) => (d.documentId === docId ? { ...d, quantity: qty } : d))
    );
  };

  const handleSubmit = async () => {
    const newErrors = {};
    const cleanedServiceName = serviceName.trim().replace(/\s{2,}/g, " ");
    const parsedTime = parseInt(estimateTime);

    if (!cleanedServiceName) newErrors.serviceName = "Nama layanan harus diisi";

    if (!estimateTime.trim()) {
      newErrors.estimateTime = "Estimasi waktu harus diisi";
    } else if (isNaN(parsedTime) || parsedTime <= 0) {
      newErrors.estimateTime = "Harus berupa angka lebih dari 0";
    }

    if (selectedDocuments.length === 0) {
      newErrors.selectedDocuments = "Pilih minimal satu dokumen";
    } else {
      const invalidDocs = selectedDocuments.filter(
        (d) => d.quantity <= 0 || isNaN(d.quantity)
      );
      if (invalidDocs.length > 0) {
        newErrors.selectedDocuments =
          "Jumlah dokumen tidak valid. Untuk 'materai', isi jumlah lebih dari 0.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const serviceList = await api.get("/service/user");
      const existing = serviceList.data.find(
        (svc) =>
          svc.serviceName &&
          svc.serviceName.toLowerCase() === cleanedServiceName.toLowerCase()
      );

      if (existing) {
        setErrors({ serviceName: "Nama layanan sudah ada" });
        setLoading(false);
        return;
      }

      const payload = {
        serviceName: cleanedServiceName,
        estimatedTime: parsedTime,
        documents: selectedDocuments,
      };

      await api.post("/service", payload);

      setServiceName("");
      setEstimateTime("");
      setSelectedDocuments([]);
      navigate("/layanan");
    } catch (error) {
      console.error("Gagal menambahkan layanan:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      setErrors((prev) => ({ ...prev, backend: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
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

            <label className="label">Estimasi Waktu (menit)</label>
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

            <div className="my-4">
              <div className="flex justify-between items-center w-full">
                <label className="label mb-2">Dokumen Terkait</label>

                <div className="mb-4">
                  <p className="text-orange-600">Tidak menemukan dokumen?</p>
                  <NavLink to={"/dokumen"} className="text-blue-600 italic">
                    tambah dokumen
                  </NavLink>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {documents.map((doc) => {
                  const selectedDoc = selectedDocuments.find(
                    (d) => d.documentId === doc.id
                  );
                  const isMaterai = doc.documentName
                    .toLowerCase()
                    .includes("materai");

                  return (
                    <div key={doc.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-warning"
                        checked={!!selectedDoc}
                        onChange={() => handleCheckboxChange(doc)}
                      />
                      <span>{doc.documentName}</span>
                      {selectedDoc && isMaterai && (
                        <input
                          type="number"
                          min="1"
                          className="input input-bordered input-sm w-20 ml-2"
                          value={selectedDoc.quantity}
                          onChange={(e) =>
                            handleQuantityChange(doc.id, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {errors.selectedDocuments && (
                <span className="text-sm text-red-500">
                  {errors.selectedDocuments}
                </span>
              )}
            </div>

            {errors.backend && (
              <div className="text-center text-red-600 font-medium mt-4">
                {errors.backend}
              </div>
            )}

            <div className="flex justify-center gap-5">
              <button
                className="btn bg-white border-orange-500 mt-4 text-orange-300 font-semibold"
                onClick={() => {
                  setServiceName("");
                  setEstimateTime("");
                  setSelectedDocuments([]);
                  setErrors({});
                  navigate("/layanan");
                }}
              >
                Batalkan
              </button>
              <button
                className={`btn mt-4 text-white font-semibold ${
                  loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500"
                }`}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Tambah"}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </Layout>
  );
};

export default AddLayanan;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

const Dokumen = () => {
  const [search, setSearch] = useState("");
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const getAllDoc = async () => {
    try {
      const response = await api.get("/document/user");
      setDocument(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoc();
  }, []);

  const filteredDoc = document.filter((doc) =>
    (doc.documentName || "").toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (doc) => {
    setSelectedDoc(doc);
    setShowModal(true);
  };

  const handleSoftDeleteDoc = async () => {
    try {
      await api.put(`/document/${selectedDoc.id}/status`);
      setShowModal(false);
      setSelectedDoc(null);
      getAllDoc();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">KELOLA DOKUMEN</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Cari Dokumen"
              className="input input-bordered w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NavLink
              to={"/dokumen/add-dokumen"}
              className="ml-2 px-4 py-2 font-semibold rounded text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              + Add
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : filteredDoc.length > 0 ? (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Updated By</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoc.map((doc, index) => (
                    <tr key={doc.id}>
                      <td>{index + 1}</td>
                      <td>{doc.documentName}</td>
                      <td>{doc.status ? "Aktif" : "Nonaktif"}</td>
                      <td>{doc.updatedBy}</td>
                      <td>{formatDate(doc.updatedAt)}</td>
                      <td className="flex gap-2">
                        <NavLink
                          to={`/dokumen/edit-dokumen/${doc.id}`}
                          className="btn btn-sm btn-warning"
                          title="Edit"
                        >
                          ✏️
                        </NavLink>
                        <button
                          onClick={() => confirmDelete(doc)}
                          className={`btn btn-sm ${
                            doc.status ? "btn-error" : "btn-success"
                          }`}
                          title={doc.status ? "Nonaktifkan" : "Aktifkan"}
                        >
                          {doc.status ? "🗑️" : "✅"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Tidak ada dokumen yang ditemukan.
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedDoc && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p>
              Apakah kamu yakin ingin menghapus dokumen{" "}
              <strong>{selectedDoc.documentName}</strong>?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm"
              >
                Batal
              </button>
              <button
                onClick={handleSoftDeleteDoc}
                className="btn btn-sm btn-error"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dokumen;

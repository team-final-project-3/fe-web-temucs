import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

const Dokumen = () => {
  const [search, setSearch] = useState("");
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const getAllDoc = async () => {
    try {
      const response = await api.get("/document");
      setDocument(response.data);
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

  const handleDeleteDoc = async (id) => {
    try {
      await api.delete(`/document/${id}`);
      getAllDoc();
    } catch (error) {
      console.error("Delete error:", error);
    }
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
                      <td>{doc.updatedBy}</td>
                      <td>{doc.updatedAt}</td>
                      <td className="flex gap-2">
                        <NavLink
                          to={`/dokumen/edit-dokumen/${doc.id}`}
                          className="btn btn-sm btn-warning"
                          title="Edit"
                        >
                          ✏️
                        </NavLink>
                        <button
                          onClick={() => {
                            setDocToDelete(doc.id);
                            setShowConfirm(true);
                          }}
                          className="btn btn-sm btn-error"
                          title="Delete"
                        >
                          🗑️
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

            {!loading && (
              <div className="text-sm text-gray-500 mt-2">
                Showing {filteredDoc.length} out of {document.length} entries
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Delete */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Konfirmasi
            </h3>
            <p className="mb-6 text-center">
              Apakah kamu yakin ingin menghapus dokumen ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  await handleDeleteDoc(docToDelete);
                  setShowConfirm(false);
                  setDocToDelete(null);
                }}
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setDocToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dokumen;

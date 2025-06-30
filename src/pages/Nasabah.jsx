import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/api";

const Nasabah = () => {
  const [nasabahList, setNasabahList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNasabah = async () => {
    try {
      const response = await api.get("/users");
      const data = response.data?.data || [];
      setNasabahList(data);
    } catch (error) {
      console.error("Gagal mengambil data nasabah:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNasabah();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold my-3">LIHAT NASABAH</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 font-medium text-gray-600">
                Loading...
              </div>
            ) : (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Fullname</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>No HP</th>
                  </tr>
                </thead>
                <tbody>
                  {nasabahList.length > 0 ? (
                    nasabahList.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.fullname || "-"}</td>
                        <td>{user.username || "-"}</td>
                        <td>{user.email || "-"}</td>
                        <td>{user.phoneNumber || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-gray-600"
                      >
                        Tidak ada data nasabah yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Nasabah;

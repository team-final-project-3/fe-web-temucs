import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useParams } from "react-router-dom";
import api from "../utils/api";
import formatDate from "../utils/formatDate";

const DetailLayanan = () => {
  const dokumenLayanan = [
    {
      id: 1,
      name: "KTP",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 2,
      name: "NPWP",
      updatedBy: "Suisei",
      updatedAt: "10-06-2025",
    },
    {
      id: 3,
      name: "Berita Acara Polisi",
      updatedBy: "Windah",
      updatedAt: "10-06-2025",
    },
  ];

  const [serviceDetail, setServiceDetail] = useState([]);
  const [serviceDocument, setServiceDocument] = useState([]);

  const { id } = useParams();
  const getDetailLayanan = async () => {
    try {
      const response = await api.get(`/service/${id}`);
      console.log(response.data);
      setServiceDetail(response.data);
      setServiceDocument(response.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailLayanan();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        <h2 className="text-2xl font-semibold my-3">Lihat Dokumen</h2>

        <div className="bg-base-100 rounded-lg shadow p-4 border-2 border-gray-300">
          <div className="text-orange-500 text-2xl uppercase font-semibold my-4 mx-3">
            {serviceDetail.serviceName}
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Updated By</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {serviceDocument.map((detailLayanan, index) => (
                  <tr key={detailLayanan.id}>
                    <td>{index + 1}</td>
                    <td>{detailLayanan.documentName}</td>
                    <td>{detailLayanan.updatedBy}</td>
                    <td>{formatDate(detailLayanan.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailLayanan;

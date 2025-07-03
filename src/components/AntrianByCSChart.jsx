import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../utils/api";

const AntrianByCSChart = ({ view, onDataReady }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/queue/count/admin?range=${view}`);
      const csCounts = response.data.csCounts || [];

      const chartData = csCounts
        .map((item) => ({
          name: item.csName || `CS ${item.csId}`,
          total: item.count || 0,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      setData(chartData);
      if (onDataReady) onDataReady(chartData);
    } catch (error) {
      console.error("Gagal memuat data csCounts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300 w-full h-[350px]">
      <h2 className="text-md font-semibold mb-2">Jumlah Antrian per CS</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#00B894" name="Total Antrian" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">Belum ada data antrian per CS.</p>
      )}
    </div>
  );
};

export default AntrianByCSChart;

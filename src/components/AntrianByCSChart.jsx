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

const AntrianByCSChart = ({ view, onDataUpdate }) => {
  const [data, setData] = useState([]);

  const filterByView = (data) => {
    const now = new Date();
    return data.filter((item) => {
      const date = new Date(item.createdAt);
      if (view === "daily") return date.toDateString() === now.toDateString();
      if (view === "weekly") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return date >= weekAgo;
      }
      if (view === "monthly") {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return date >= monthAgo;
      }
      return true;
    });
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/queue");
      const filtered = filterByView(response.data.data);
      const csCountMap = {};
      const csNameMap = {};

      filtered.forEach((item) => {
        if (item.csId) {
          const csId = item.csId;
          const csName = item.cs?.name || `CS ${csId}`;
          csCountMap[csId] = (csCountMap[csId] || 0) + 1;
          csNameMap[csId] = csName;
        }
      });

      const chartData = Object.entries(csCountMap).map(([csId, count]) => ({
        name: csNameMap[csId] || `CS ${csId}`,
        total: count,
      }));

      setData(chartData);
      onDataUpdate?.(chartData);
    } catch (error) {
      console.error("Gagal memuat data antrian per CS:", error);
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

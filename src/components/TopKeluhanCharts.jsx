import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import api from "../utils/api";

const TopKeluhanCharts = ({ view, onDataReady }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchKeluhan = async () => {
      try {
        const response = await api.get("/queue");
        const filtered = filterByView(response.data?.data || []);
        const serviceCount = {};

        filtered.forEach((item) => {
          if (item.services && item.services.length > 0) {
            item.services.forEach((service) => {
              const name = service.serviceName;
              serviceCount[name] = (serviceCount[name] || 0) + 1;
            });
          }
        });

        const top5 = Object.entries(serviceCount)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setChartData(top5);
        if (onDataReady) onDataReady(top5);
      } catch (error) {
        console.error("Gagal fetch data keluhan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKeluhan();
  }, [view]);

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4 w-full h-[350px]">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Top Keluhan</h2>
        <span className="text-sm text-blue-500 cursor-pointer">View All</span>
      </div>
      {loading ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Loading chart...
        </p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Tidak ada data keluhan untuk ditampilkan. (Silakan tambah data
          terlebih dahulu.)
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              className="text-sm"
              width={150}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#FFA500">
              <LabelList dataKey="value" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TopKeluhanCharts;

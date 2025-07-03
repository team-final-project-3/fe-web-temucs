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

  useEffect(() => {
    const fetchTopLayanan = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/queue/count/admin?range=${view}`);
        const formatted = (response.data.top5Layanan || [])
          .map((item) => ({
            name: item.serviceName,
            value: item.count,
          }))
          .sort((a, b) => b.value - a.value);

        setChartData(formatted);
        if (onDataReady) onDataReady(formatted);
      } catch (error) {
        console.error("Gagal fetch data top5Layanan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopLayanan();
  }, [view]);

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4 w-full h-[350px]">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Top 5 Layanan</h2>
      </div>
      {loading ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Loading chart...
        </p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Tidak ada data layanan untuk ditampilkan.
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

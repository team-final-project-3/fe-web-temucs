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

const TopAntrianCharts = ({ view = "day", onDataReady }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/queue/count/admin", {
          params: { range: view },
        });

        const top5 = (res.data.top5Antrian || [])
          .map((item) => ({
            name: item.branchName,
            value: item.count || 0,
          }))
          .sort((a, b) => b.value - a.value);

        setChartData(top5);
        if (onDataReady) onDataReady(top5);
      } catch (error) {
        console.error("Error fetching top 5 antrian:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [view]);

  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 shadow-md p-4 w-full h-[350px]">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Top 5 Antrian</h2>
      </div>
      {loading ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Loading chart...
        </p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Tidak ada data Antrian untuk ditampilkan. (Silakan tambah data
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
              width={120}
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

export default TopAntrianCharts;

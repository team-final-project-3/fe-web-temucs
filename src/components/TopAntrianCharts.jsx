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

const TopAntrianCharts = ({ view, onDataReady }) => {
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
    const fetchData = async () => {
      try {
        const [queueRes, branchRes] = await Promise.all([
          api.get("/queue"),
          api.get("/branch"),
        ]);
        const queueData = filterByView(queueRes.data.data);
        const branchData = branchRes.data.branches;
        const queueCount = {};
        queueData.forEach((item) => {
          const branchId = item.branchId;
          if (branchId) queueCount[branchId] = (queueCount[branchId] || 0) + 1;
        });
        const merged = branchData.map((branch) => ({
          name: branch.name,
          value: queueCount[branch.id] || 0,
        }));
        const top5 = merged.sort((a, b) => b.value - a.value).slice(0, 5);
        setChartData(top5);
        if (onDataReady) onDataReady(top5);
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [view]);

  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 shadow-md p-4 w-full h-[350px]">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Top Antrian</h2>
        <span className="text-sm text-blue-500 cursor-pointer">View All</span>
      </div>
      {loading ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          Loading chart...
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

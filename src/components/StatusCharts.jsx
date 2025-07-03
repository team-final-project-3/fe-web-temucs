import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import api from "../utils/api";

const STATUS_COLORS = {
  done: "#2ECC71",
  "in progress": "#F1C40F",
  canceled: "#E74C3C",
  waiting: "#3498DB",
  skipped: "#95A5A6",
  called: "#9B59B6",
};

const StatusCharts = ({ view, onDataReady }) => {
  const [statusData, setStatusData] = useState([]);

  const fetchStatusCounts = async () => {
    try {
      const response = await api.get(`/queue/count/admin?range=${view}`);
      const counts = response.data.statusCounts || {};

      const formatted = Object.entries(counts).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
      }));

      setStatusData(formatted);
      if (onDataReady) onDataReady(formatted);
    } catch (error) {
      console.error("Gagal mengambil statusCounts:", error);
    }
  };

  useEffect(() => {
    fetchStatusCounts();
  }, [view]);

  const total = statusData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md w-full h-[350px]">
      <h2 className="text-md font-semibold text-center mb-2">Status Antrian</h2>
      <div className="relative h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="100%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              labelLine={false}
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={STATUS_COLORS[entry.name.toLowerCase()] || "#BDC3C7"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-lg font-bold">{total}</div>
          <div className="text-sm">total</div>
        </div>
      </div>
      <div className="flex justify-center mt-10 flex-wrap gap-4 text-sm">
        {statusData.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  STATUS_COLORS[entry.name.toLowerCase()] || "#BDC3C7",
              }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusCharts;

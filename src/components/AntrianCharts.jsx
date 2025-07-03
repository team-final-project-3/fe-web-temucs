import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AntrianCharts = ({ data, view }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data) return;

    const transformed = data.map((item) => ({
      day: formatLabel(item.label, view),
      online: item.totalQueueOnline || 0,
      offline: item.totalQueueOffline || 0,
    }));

    setChartData(transformed);
  }, [data, view]);

  const formatLabel = (label, view) => {
    const date = new Date(label);
    if (view === "daily") {
      return date.toLocaleDateString("id-ID", { weekday: "long" });
    } else if (view === "weekly") {
      return `Minggu ke-${getWeekNumber(date)}`;
    } else if (view === "monthly") {
      return date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
    }
    return label;
  };

  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFulear(), 0, 1);
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300 my-4">
      <h2 className="text-md font-semibold mb-2">
        Aktivitas Nasabah (
        {view === "day" ? "Harian" : view === "week" ? "Mingguan" : "Bulanan"})
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="online"
            stroke="#3366FF"
            name="Antrian Online"
          />
          <Line
            type="monotone"
            dataKey="offline"
            stroke="#FF5733"
            name="Antrian Offline"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AntrianCharts;

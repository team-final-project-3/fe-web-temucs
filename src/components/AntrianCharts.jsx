import React from "react";
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

const data = [
  { day: 1, online: 20, offline: 10 },
  { day: 2, online: 40, offline: 25 },
  { day: 3, online: 70, offline: 35 },
  { day: 4, online: 30, offline: 20 },
  { day: 5, online: 15, offline: 25 },
  { day: 6, online: 40, offline: 60 },
  { day: 7, online: 55, offline: 80 },
  { day: 8, online: 90, offline: 70 },
];

const AntrianCharts = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300">
      <h2 className="text-md font-semibold mb-2">Activity Nasabah</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
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

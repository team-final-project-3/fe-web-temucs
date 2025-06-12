import React from "react";
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

const data = [
  { name: "Jakarta Kota", value: 30 },
  { name: "Daan Mogot", value: 20 },
  { name: "Rawamangun", value: 12 },
  { name: "Senayan", value: 11 },
  { name: "Karamat", value: 0 },
];

const TopAntrianCharts = () => {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 shadow-md p-4 w-full md:w-1/2">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Top Antrian</h2>
        <span className="text-sm text-blue-500 cursor-pointer">View All</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" className="text-sm" />
          <Tooltip />
          <Bar dataKey="value" fill="#FFA500">
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopAntrianCharts;

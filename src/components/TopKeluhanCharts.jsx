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
  { name: "Kartu Rusak", value: 30 },
  { name: "Kartu Hilang", value: 8 },
  { name: "Riset Pin", value: 2 },
  { name: "Riset Password ", value: 1 },
  { name: "Ganti Kartu", value: 0 },
];

const TopKeluhanCharts = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-300 p-4 w-full md:w-1/2">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Top Keluhan</h2>
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

export default TopKeluhanCharts;

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

    if (view === "daily") {
      setChartData(prepareDailyData(data));
    } else if (view === "weekly") {
      setChartData(prepareWeeklyData(data));
    } else if (view === "monthly") {
      setChartData(prepareMonthlyData(data));
    }
  }, [data, view]);

  const prepareDailyData = (list) => {
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const result = {};
    days.forEach((day) => {
      result[day] = { day, online: 0, offline: 0 };
    });

    list.forEach((item) => {
      const date = new Date(item.bookingDate);
      const dayName = date.toLocaleDateString("id-ID", { weekday: "long" });
      if (result[dayName]) {
        if (item.loketId == null) result[dayName].online += 1;
        else result[dayName].offline += 1;
      }
    });

    return days.map((day) => result[day]);
  };

  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return (
      d.getFullYear() +
      "-W" +
      String(
        1 +
          Math.round(
            ((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
          )
      ).padStart(2, "0")
    );
  };

  const prepareWeeklyData = (list) => {
    const result = {};
    list.forEach((item) => {
      const week = getWeekNumber(item.bookingDate);
      if (!result[week]) result[week] = { day: week, online: 0, offline: 0 };
      if (item.loketId == null) result[week].online += 1;
      else result[week].offline += 1;
    });

    return Object.values(result);
  };

  const prepareMonthlyData = (list) => {
    const result = {};
    list.forEach((item) => {
      const date = new Date(item.bookingDate);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!result[key]) result[key] = { day: key, online: 0, offline: 0 };
      if (item.loketId == null) result[key].online += 1;
      else result[key].offline += 1;
    });

    return Object.values(result);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300 my-4">
      <h2 className="text-md font-semibold mb-2">
        Aktivitas Nasabah (
        {view === "daily"
          ? "Harian"
          : view === "weekly"
          ? "Mingguan"
          : "Bulanan"}
        )
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

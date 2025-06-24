import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import api from "../utils/api";
import { subDays, format } from "date-fns";

const JamRamaiHeatMap = () => {
  const [heatData, setHeatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/queue");
        const queueData = response.data.data;

        // Hitung jumlah per hari (format yyyy-MM-dd)
        const counts = {};
        queueData.forEach((item) => {
          const date = new Date(item.bookingDate);
          const key = format(date, "yyyy-MM-dd");
          counts[key] = (counts[key] || 0) + 1;
        });

        // Format data untuk HeatMap
        const data = Object.entries(counts).map(([date, count]) => ({
          date,
          count,
        }));

        setHeatData(data);
      } catch (err) {
        console.error("Gagal mengambil data heatmap:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 w-full">
      <h2 className="text-md font-semibold mb-3">Heatmap Aktivitas Antrian</h2>
      <HeatMap
        value={heatData}
        weekLabels={["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]}
        monthLabels={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ]}
        startDate={subDays(new Date(), 90)} // tampilkan 90 hari ke belakang
        panelColors={{
          0: "#e0e0e0",
          1: "#fcd34d",
          3: "#f59e0b",
          5: "#ef4444",
          10: "#dc2626",
        }}
        rectRender={(props, data) => {
          const tooltip = `${data.date} - ${data.count || 0} antrian`;
          return <rect {...props} title={tooltip} />;
        }}
      />
    </div>
  );
};

export default JamRamaiHeatMap;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Welcome from "../components/Welcome";
import { Building2, User2Icon } from "lucide-react";
import AntrianCharts from "../components/AntrianCharts";
import TopAntrianCharts from "../components/TopAntrianCharts";
import TopKeluhanCharts from "../components/TopKeluhanCharts";
import ExportExcelButton from "../components/ExportExcelButton";
import api from "../utils/api";
import StatusCharts from "../components/StatusCharts";
import AntrianByCSChart from "../components/AntrianByCSChart";

const Dashboard = () => {
  const [cabang, setCabang] = useState(0);
  const [antrianTotal, setAntrianTotal] = useState(0);
  const [antrianData, setAntrianData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [csData, setCsData] = useState([]);
  const [topAntrianData, setTopAntrianData] = useState([]);
  const [topKeluhanData, setTopKeluhanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState("day");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/queue/count/admin?range=${chartView}`);

      setCabang(response.data.totalBranch || 0);
      setAntrianTotal(response.data.totalQueue || 0);
      setAntrianData(response.data.groups || []);
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [chartView]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600 font-medium">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Welcome />
      <div className="my-4">
        <div className="flex w-full flex-col lg:flex-row text-white">
          <div className="card bg-[#FF7F08] rounded-box h-32 grow flex flex-row items-center justify-center gap-5">
            <Building2 size={80} />
            <h1 className="text-3xl font-bold">{cabang}</h1>
            <div className="flex flex-col text-xl">
              <p>Jumlah</p>
              <p>Cabang</p>
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-[#FF7F08] rounded-box h-32 grow flex flex-row items-center justify-center gap-5">
            <User2Icon size={80} />
            <h1 className="text-3xl font-bold">{antrianTotal}</h1>
            <div className="flex flex-col text-xl">
              <p>Jumlah</p>
              <p>Antrian</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-gray-700">
            Grafik Aktivitas Nasabah
          </h2>
          <div className="flex gap-2">
            <select
              value={chartView}
              onChange={(e) => setChartView(e.target.value)}
              className="select select-bordered w-40"
            >
              <option value="day">Tiap Hari</option>
              <option value="week">Tiap Minggu</option>
              <option value="month">Tiap Bulan</option>
            </select>
            <ExportExcelButton
              antrianData={antrianData}
              statusData={statusData}
              csData={csData}
              topAntrianData={topAntrianData}
              topKeluhanData={topKeluhanData}
              fileName="Dashboard_Antrian"
            />
          </div>
        </div>

        <AntrianCharts data={antrianData} view={chartView} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <StatusCharts view={chartView} onDataReady={setStatusData} />
          <AntrianByCSChart view={chartView} onDataReady={setCsData} />
          <TopAntrianCharts view={chartView} onDataReady={setTopAntrianData} />
          <TopKeluhanCharts view={chartView} onDataReady={setTopKeluhanData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

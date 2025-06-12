import React from "react";
import Layout from "../components/Layout";
import Welcome from "../components/Welcome";
import { Building2, User2Icon } from "lucide-react";
import AntrianCharts from "../components/AntrianCharts";
import TopAntrianCharts from "../components/TopAntrianCharts";
import TopKeluhanCharts from "../components/TopKeluhanCharts";

const Dashboard = () => {
  return (
    <Layout>
      <Welcome />
      <div className="my-4">
        <div className="flex w-full flex-col lg:flex-row text-white">
          <div className="card bg-[#FF7F08] rounded-box h-32 grow flex flex-row items-center justify-center gap-5">
            <Building2 size={80} />
            <h1 className="text-3xl font-bold">10</h1>
            <div className="flex flex-col text-xl">
              <p>Jumlah</p>
              <p>Cabang</p>
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-[#FF7F08] rounded-box h-32 grow flex flex-row items-center justify-center gap-5">
            <User2Icon size={80} />
            <h1 className="text-3xl font-bold">73</h1>
            <div className="flex flex-col text-xl">
              <p>Jumlah</p>
              <p>Antrian</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-15 mt-4">
        <AntrianCharts />
        <div className="flex gap-10">
          <TopAntrianCharts />
          <TopKeluhanCharts />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

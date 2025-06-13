import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cabang from "./pages/Cabang";
import Nasabah from "./pages/Nasabah";
import Libur from "./pages/Libur";
import Layanan from "./pages/Layanan";
import Antrian from "./pages/Antrian";
import Profil from "./pages/Profil";
import DetailCabang from "./pages/DetailCabang";
import AddCS from "./pages/AddCS";
import EditAkunDiCabang from "./pages/EditAkunDiCabang";
import AddCabang from "./pages/AddCabang";
import EditCabang from "./pages/EditCabang";
import AddLibur from "./pages/AddLibur";
import EditLibur from "./pages/EditLibur";
import AddLayanan from "./pages/AddLayanan";
import EditLayanan from "./pages/EditLayanan";
import DetailLayanan from "./pages/DetailLayanan";
import Dokumen from "./pages/Dokumen";
import AddDokumen from "./pages/AddDokumen";
import EditDokumen from "./pages/EditDokumen";
import CsDashboard from "./pages/csDashboard";
import CsLayanan from "./pages/csLayanan";
import CsDetailLayanan from "./pages/csDetailLayanan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />

        {/* Web CS */}
        <Route path="/cs-dashboard" element={<CsDashboard />} />
        <Route path="/cs-layanan" element={<CsLayanan />} />
        <Route path="/cs-detail-layanan" element={<CsDetailLayanan />} />

        {/* cabang */}
        <Route path="/cabang" element={<Cabang />} />
        <Route path="/cabang/add-cabang" element={<AddCabang />} />
        <Route path="/cabang/edit-cabang" element={<EditCabang />} />
        <Route path="/cabang/detail-cabang" element={<DetailCabang />} />
        <Route path="/cabang/detail-cabang/add-cs" element={<AddCS />} />
        <Route
          path="/cabang/detail-cabang/edit-cs-loket"
          element={<EditAkunDiCabang />}
        />
        {/* libur */}
        <Route path="/libur" element={<Libur />} />
        <Route path="/libur/add-libur" element={<AddLibur />} />
        <Route path="/libur/edit-libur" element={<EditLibur />} />

        {/* nasabah */}
        <Route path="/nasabah" element={<Nasabah />} />

        {/* layanan */}
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/layanan/detail-layanan" element={<DetailLayanan />} />
        <Route path="/layanan/add-layanan" element={<AddLayanan />} />
        <Route path="/layanan/edit-layanan" element={<EditLayanan />} />

        {/* antrian */}
        <Route path="/antrian" element={<Antrian />} />

        {/* dokumen */}
        <Route path="/dokumen" element={<Dokumen />} />
        <Route path="/dokumen/add-dokumen" element={<AddDokumen />} />
        <Route path="/dokumen/edit-dokumen" element={<EditDokumen />} />
      </Routes>
    </Router>
  );
}

export default App;

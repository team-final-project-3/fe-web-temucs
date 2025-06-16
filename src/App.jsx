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
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddLoket from "./pages/AddLoket";
import EditCS from "./pages/EditCS";
import EditLoket from "./pages/EditLoket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/profil" element={<Profil />} />

        {/* cabang */}
        <Route
          path="/cabang"
          element={
            <ProtectedRoutes>
              <Cabang />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cabang/add-cabang"
          element={
            <ProtectedRoutes>
              <AddCabang />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cabang/edit/:id"
          element={
            <ProtectedRoutes>
              <EditCabang />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cabang/:id"
          element={
            <ProtectedRoutes>
              <DetailCabang />
            </ProtectedRoutes>
          }
        />
        <Route path="/cabang/:id/add-cs" element={<AddCS />} />
        <Route path="/cabang/:id/add-loket" element={<AddLoket />} />
        <Route path="/cabang/:id/edit-cs" element={<EditCS />} />
        <Route path="/cabang/:id/edit-loket" element={<EditLoket />} />

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
        <Route
          path="/dokumen"
          element={
            <ProtectedRoutes>
              <Dokumen />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dokumen/add-dokumen"
          element={
            <ProtectedRoutes>
              <AddDokumen />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dokumen/edit-dokumen/:id"
          element={
            <ProtectedRoutes>
              <EditDokumen />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

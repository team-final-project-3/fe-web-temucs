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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nasabah" element={<Nasabah />} />
        <Route path="/libur" element={<Libur />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/antrian" element={<Antrian />} />
        <Route path="/profil" element={<Profil />} />

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
      </Routes>
    </Router>
  );
}

export default App;

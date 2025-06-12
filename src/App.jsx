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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cabang" element={<Cabang />} />
        <Route path="/nasabah" element={<Nasabah />} />
        <Route path="/libur" element={<Libur />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/antrian" element={<Antrian />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;

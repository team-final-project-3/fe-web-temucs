import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cabang from "./pages/Cabang";
import Nasabah from "./pages/Nasabah";
import Libur from "./pages/Libur";
import Layanan from "./pages/Layanan";
import Antrian from "./pages/Antrian";
import DetailCabang from "./pages/DetailCabang";
import AddCS from "./pages/AddCS";
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
import AddLoket from "./pages/AddLoket";
import EditCS from "./pages/EditCS";
import EditLoket from "./pages/EditLoket";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NoInternet from "./components/NoInternet";
import { useEffect, useState } from "react";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => window.location.reload();

  if (!isOnline) {
    return <NoInternet onRetry={handleRetry} />;
  }

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
          path="/cabang/edit-cabang/:id"
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
        <Route
          path="/cabang/:id/add-cs"
          element={
            <ProtectedRoutes>
              <AddCS />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cabang/:id/add-loket"
          element={
            <ProtectedRoutes>
              <AddLoket />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cabang/:branchId/edit-cs/:csId"
          element={
            <ProtectedRoutes>
              <EditCS />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cabang/:branchId/edit-loket/:loketId"
          element={
            <ProtectedRoutes>
              <EditLoket />
            </ProtectedRoutes>
          }
        />

        {/* libur */}
        <Route
          path="/libur"
          element={
            <ProtectedRoutes>
              <Libur />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/libur/add-libur"
          element={
            <ProtectedRoutes>
              <AddLibur />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/libur/edit-libur/:id"
          element={
            <ProtectedRoutes>
              <EditLibur />
            </ProtectedRoutes>
          }
        />

        {/* nasabah */}
        {/* <Route
          path="/nasabah"
          element={
            <ProtectedRoutes>
              <Nasabah />
            </ProtectedRoutes>
          }
        /> */}

        {/* layanan */}
        <Route
          path="/layanan"
          element={
            <ProtectedRoutes>
              <Layanan />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/layanan/:id"
          element={
            <ProtectedRoutes>
              <DetailLayanan />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/layanan/add-layanan"
          element={
            <ProtectedRoutes>
              <AddLayanan />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/layanan/edit-layanan/:id"
          element={
            <ProtectedRoutes>
              <EditLayanan />
            </ProtectedRoutes>
          }
        />

        {/* antrian */}
        <Route
          path="/antrian"
          element={
            <ProtectedRoutes>
              <Antrian />
            </ProtectedRoutes>
          }
        />

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

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcelButton = ({
  antrianData = [],
  statusData = [],
  csData = [],
  topAntrianData = [],
  topKeluhanData = [],
  fileName = "Dashboard_Export",
}) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Data Antrian
    if (antrianData.length) {
      const formatted = antrianData.map((item, index) => ({
        No: index + 1,
        Nama: item.name || "-",
        Email: item.user?.email || "-",
        "No HP": item.user?.phoneNumber || "-",
        Cabang: item.branch?.name || "-",
        Status: item.loketId == null ? "Online" : "Offline",
        Tanggal: new Date(item.bookingDate).toLocaleDateString("id-ID"),
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Data Antrian");
    }

    // Sheet 2: Status Antrian
    if (statusData.length) {
      const formatted = statusData.map((item, index) => ({
        No: index + 1,
        Status: item.name,
        Jumlah: item.value,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Status Antrian");
    }

    // Sheet 3: Antrian per CS
    if (csData.length) {
      const formatted = csData.map((item, index) => ({
        No: index + 1,
        "Nama CS": item.name,
        "Jumlah Antrian": item.total,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Antrian per CS");
    }

    // Sheet 4: Top Antrian
    if (topAntrianData.length) {
      const formatted = topAntrianData.map((item, index) => ({
        No: index + 1,
        Cabang: item.name,
        "Jumlah Antrian": item.value,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Top Antrian");
    }

    // Sheet 5: Top Keluhan
    if (topKeluhanData.length) {
      const formatted = topKeluhanData.map((item, index) => ({
        No: index + 1,
        Keluhan: item.name,
        Jumlah: item.value,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Top Keluhan");
    }

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={exportToExcel}
      className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
    >
      Export to Excel
    </button>
  );
};

export default ExportExcelButton;

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

    if (antrianData.length) {
      const formatted = antrianData.map((item, index) => ({
        No: index + 1,
        Bulan: item.label,
        "Antrian Online": item.totalQueueOnline || 0,
        "Antrian Offline": item.totalQueueOffline || 0,
        "Jumlah Antrian": item.totalQueueInRange || 0,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Data Antrian");
    }

    if (statusData.length) {
      const formatted = statusData.map((item, index) => ({
        No: index + 1,
        Status: item.name,
        Jumlah: item.value,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Status Antrian");
    }

    if (csData.length) {
      const formatted = csData.map((item, index) => ({
        No: index + 1,
        "Nama CS": item.name,
        "Jumlah Antrian": item.total,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Antrian per CS");
    }

    if (topAntrianData.length) {
      const formatted = topAntrianData.map((item, index) => ({
        No: index + 1,
        Cabang: item.name,
        "Jumlah Antrian": item.value,
      }));
      const sheet = XLSX.utils.json_to_sheet(formatted);
      XLSX.utils.book_append_sheet(workbook, sheet, "Top Antrian");
    }

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

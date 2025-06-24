import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcelButton = ({ sheets = {}, fileName = "Data" }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    Object.entries(sheets).forEach(([sheetName, data]) => {
      if (!Array.isArray(data) || data.length === 0) return;

      let exportData = [];

      if (sheetName === "Status") {
        exportData = data.map((item, index) => ({
          No: index + 1,
          Status: item.name || "-",
          Jumlah: item.value || 0,
        }));
      } else if (sheetName === "AntrianPerCS") {
        exportData = data.map((item, index) => ({
          No: index + 1,
          CS: item.name || "-",
          TotalAntrian: item.total || 0,
        }));
      } else if (sheetName === "TopAntrian") {
        exportData = data.map((item, index) => ({
          No: index + 1,
          Cabang: item.name || "-",
          JumlahAntrian: item.value || 0,
        }));
      } else if (sheetName === "TopKeluhan") {
        exportData = data.map((item, index) => ({
          No: index + 1,
          JenisKeluhan: item.name || "-",
          Jumlah: item.value || 0,
        }));
      }

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

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

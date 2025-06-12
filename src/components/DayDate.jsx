import React from "react";

const DayDate = () => {
  const getFormattedDate = () => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const date = new Date();
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return {
      dayName,
      fullDate: `${day}/${month}/${year}`,
    };
  };

  const { dayName, fullDate } = getFormattedDate();

  return (
    <div>
      <h2 style={{ color: "#3D474B" }}>
        <strong>{dayName}</strong>, {fullDate}
      </h2>
    </div>
  );
};

export default DayDate;

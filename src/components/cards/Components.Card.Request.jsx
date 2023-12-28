import { NavLink } from "react-router-dom";
import React from "react";
import { hexToRGB, tailwindConfig } from "../../utils/Utils";
import DropdownHelp from "../Components.DropdownHelp";
import BarChart02 from "../../charts/Charts.BarChart02";

const CardRequest = () => {
  const chartData = {
    labels: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          100, 100, 100, 75, 96, 100, 100, 100, 50, 100, 100, 100,
        ],
        fill: true,
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        barThickness: 10,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 0,
        borderRadius: 3,
        tension: 0,
        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      },
    ],
  };

  const average =
    chartData.datasets[0].data.reduce((acc, val) => acc + val, 0) /
    chartData.datasets[0].data.length;

  return (
    <div className="lg:col-span-1 md:col-span-1 sm:col-span-3 xs:col-span-3 dash-card p-4 flex flex-col">
      <div className="flex p-2 flex-grow">
        <div className="flex flex-col">
          <span className="pr-2">Request Latency</span>
          <span className="text-sm">{average.toFixed(2)}%</span>
        </div>
      </div>
      <hr className="w-full h-px bg-slate-200 secondaryDark border-none" />
      <div className="flex pt-2">
        <BarChart02 data={chartData} height={100} />
      </div>
    </div>
  );
};

export default CardRequest;

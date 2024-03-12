import { NavLink } from "react-router-dom";
import React from "react";
import LineChart02 from "../charts/Charts.LineChart02";
import { hexToRGB, tailwindConfig } from "../../utils/Utils";
import DropdownHelp from "../Components.DropdownHelp";

const CardUptime = ({data}) => {
  const chartData = {
    labels: data?.labels ?? [],
    datasets: [
      // Indigo line
      {
        data: data?.values ?? [],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  const average =
    chartData.datasets[0].data.reduce((acc, val) => acc + val, 0) /
    chartData.datasets[0].data.length;

  return (
    <div className="lg:col-span-2 md:col-span-2 sm:col-span-3 xs:col-span-3 dash-card">
      <div className="flex flex-row p-6">
        <div className="flex w-full ">
          <span className="pr-2">Endpoint Uptime</span>
          <span className="text-sm">{average.toFixed(2)}%</span>
        </div>
        <DropdownHelp />
      </div>
      <div className="flex">
        <LineChart02 data={chartData} height={200} />
      </div>
    </div>
  );
};

export default CardUptime;

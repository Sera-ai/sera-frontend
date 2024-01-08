import { NavLink } from "react-router-dom";
import React from "react";
import LineChart02 from "../charts/Charts.LineChart02";
import { hexToRGB, tailwindConfig } from "../../utils/Utils";
import DropdownHelp from "../Components.DropdownHelp";

const CardUptime = () => {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
      "02-01-2022",
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "08-01-2022",
      "09-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "01-01-2023",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          100, 100, 100, 100, 94, 100, 100, 100, 100, 100, 60, 100, 100, 100,
          100, 100, 100, 75, 96, 100, 100, 100, 0, 100, 100, 100,
        ],
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

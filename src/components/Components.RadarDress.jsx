import React, { useState, useContext, useEffect, useRef } from "react";
import SankeyComponent from "./charts/Charts.Sankey";

import Starfield from "react-starfield";
import { AppContext } from "../provider/Provider.State";
import Datepicker from "./Components.Datepicker";
import CardinalAreaChart from "./charts/Charts.CardinalAreaChart";
import CardinalAreaChartLarge from "./charts/Charts.CardinalAreaChart.Large";
import DropdownDate from "./Components.DropdownDate";
import RadarChartComponent from "./charts/Charts.RadarChart";
import { BuilderIcon } from "../assets/assets.svg";

function RadarDress({ data, BadgeBar, periodSelection }) {
  const BarBuilder = () =>
    data.map((item, index) => (
      <BadgeBar
        title={`${item.subject}: ${item.actual}`}
        subtitle={item.description}
        icon={<BuilderIcon color="#ffffff80" size="24" />}
      />
    ));

  return (
    <>
      <div style={{ borderTopWidth: 4, borderTopColor: "#191A21" }}>
        <h2 className="text-slate-800 dark:text-slate-100 p-4 uppercase text-xs">
          Ecosystem Health ({periodSelection})
        </h2>
        <div className="py-4">
          <RadarChartComponent data={data} />
        </div>
      </div>

      <div style={{ borderTopWidth: 4, borderTopColor: "#191A21" }}>
        <h2 className="text-slate-800 dark:text-slate-100 p-4 uppercase text-xs">
          Updates and Information ({periodSelection})
        </h2>
        <div className="px-4 flex-row space-y-4">
          <BarBuilder />
        </div>
      </div>
    </>
  );
}

export default RadarDress;

import React, { useState, useContext, useEffect, useRef } from "react";
import CardinalAreaChart from "../../../components/charts/Charts.CardinalAreaChart";
import { EventsIcon, InventoryIcon } from "../../../assets/assets.svg";
import SankeyDress from "../../../components/Components.SankeyDress";
import { getAnalytics } from "../../../provider/Provider.Data";
import RadarDress from "../../../components/Components.RadarDress";

function InventoryDetailsData({ endpoint, overview = false }) {
  const [periodSelection, setPeriodSelection] = useState("monthly");

  const [endpointAreaChart, setEndpointAreaChart] = useState([]);
  const [endpointSankeyChart, setEndpointSankeyChart] = useState(null);
  const [endpointRadialChart, setEndpointRadialChart] = useState([]);
  const [endpointStatistics, setEndpointStatistics] = useState([]);

  useEffect(() => {
    async function getAnalyticsData() {
      try {
        const searchResult = await getAnalytics({ period: periodSelection });
        console.log(searchResult);
        if (searchResult) {
          setEndpointAreaChart(searchResult.endpointAreaChart);
          setEndpointSankeyChart(searchResult.endpointSankeyChart);
          setEndpointRadialChart(searchResult.endpointRadialChart);
          setEndpointStatistics(searchResult.endpointStatistics);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getAnalyticsData();
  }, [periodSelection]);

  const BadgeBar = ({ title, subtitle, icon }) => (
    <div className="dndnode big-pointer">
      <div
        className="dndnodeicon handleLeft scriptBorder"
        style={{ height: 42 }}
      >
        {icon}
      </div>
      <div className=" space-y-1 pt-[2px]">
        <div className="nodeTitle">{title}</div>
        <div className="nodeSubtitle">{subtitle}</div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 w-full p-4">
      {/* <BarGraph bare={true} /> */}

      {/* <div className="col-span-3 h-[300px] flex flex-col">
        <h2 className="text-sm text-slate-800 dark:text-slate-100 pl-2 mb-10">
          Request Metrics
        </h2>
        <CardinalAreaChart data={uptimeDetails} />
      </div> */}

      <div className="w-[400px] flex flex-col py-4 dash-card overflow-y-scroll no-scrollbar">
        <h2 className="text-slate-800 dark:text-slate-100 pl-4 pb-4 uppercase text-xs py-[4px]">
          Ecosystem Overview - Global ({periodSelection})
        </h2>

        <div className="flex flex-col mainDark">
          <CardinalAreaChart data={endpointAreaChart} />

          <div className="py-4 flex-row space-y-4">
            <BadgeBar
              title={"302 New Events"}
              subtitle={"Click to view new events"}
              icon={
                <EventsIcon
                  color="#ffffff80"
                  secondaryColor="#4799ff"
                  size="24"
                />
              }
            />
            <BadgeBar
              title={"13 Inventory Changes"}
              subtitle={"Click to view inventory changes"}
              icon={<InventoryIcon color="#4799ff" size="24" />}
            />
          </div>
        </div>

        <RadarDress
          data={endpointRadialChart}
          periodSelection={periodSelection}
          BadgeBar={BadgeBar}
        />
      </div>

      <SankeyDress
        periodSelection={periodSelection}
        onPeriodSelection={setPeriodSelection}
        chartData={endpointSankeyChart}
      />
    </div>
  );
}

export default InventoryDetailsData;

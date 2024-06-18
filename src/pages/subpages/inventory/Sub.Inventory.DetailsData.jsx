import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../provider/Provider.State";
import CardinalAreaChart from "../../../components/charts/Charts.CardinalAreaChart";
import RadarChartComponent from "../../../components/charts/Charts.RadarChart";
import {
  BuilderIcon,
  EventIcon,
  EventsIcon,
  InventoryIcon,
  ScriptIcon,
} from "../../../assets/assets.svg";
import SankeyDress from "../../../components/Components.SankeyDress";
import { getAnalytics } from "../../../provider/Provider.Data";

function InventoryDetailsData({ endpoint, overview = false }) {
  const { endpointDetails, uptimeDetails } = useContext(AppContext);

  const BadgeBar = ({ title, subtitle, icon }) => (
    <div className="dndnode">
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

        <div style={{ borderTopWidth: 4, borderTopColor: "#191A21" }}>
          <h2 className="text-slate-800 dark:text-slate-100 p-4 uppercase text-xs">
            Ecosystem Health ({periodSelection})
          </h2>
          <div className="py-4">
            <RadarChartComponent data={uptimeDetails} />
          </div>
        </div>

        <div style={{ borderTopWidth: 4, borderTopColor: "#191A21" }}>
          <h2 className="text-slate-800 dark:text-slate-100 p-4 uppercase text-xs">
            Updates and Information ({periodSelection})
          </h2>
          <div className="px-4 flex-row space-y-4">
            <BadgeBar
              title={"Average Latency: 32ms"}
              subtitle={"Average Network RTT speed"}
              icon={<BuilderIcon color="#ffffff80" size="24" />}
            />
            <BadgeBar
              title={"Active Builders: 201"}
              subtitle={"85% of your endpoints have a builder"}
              icon={<BuilderIcon color="#ffffff80" size="24" />}
            />
            <BadgeBar
              title={"Average RPS: 70%"}
              subtitle={"The avg request per second"}
              icon={<BuilderIcon color="#ffffff80" size="24" />}
            />
            <BadgeBar
              title={"Success Response Rate: 96%"}
              subtitle={"Network response returning Status Code 2XX"}
              icon={<BuilderIcon color="#ffffff80" size="24" />}
            />
            <BadgeBar
              title={"Service Uptime: 90%"}
              subtitle={"Uptime for endpoints in Sera"}
              icon={<BuilderIcon color="#ffffff80" size="24" />}
            />
          </div>
        </div>
      </div>

      <SankeyDress
        periodSelection={periodSelection}
        onPeriodSelection={setPeriodSelection}
        chartData={endpointSankeyChart}
      />

      {/* <div className="col-span-3  h-[400px] flex flex-col dash-card pt-4">
        <h2 className="text-sm text-slate-800 dark:text-slate-100 pl-8">
          Request Latency (ms)
        </h2>
        <NewBarChart data={uptimeDetails} />
      </div> */}
    </div>
  );
}

export default InventoryDetailsData;

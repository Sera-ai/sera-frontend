import React, { useState, useContext, useEffect, useRef } from "react";
import SankeyComponent from "./charts/Charts.Sankey";

import Starfield from "react-starfield";
import { AppContext } from "../provider/Provider.State";
import Datepicker from "./Components.Datepicker";
import CardinalAreaChart from "./charts/Charts.CardinalAreaChart";
import CardinalAreaChartLarge from "./charts/Charts.CardinalAreaChart.Large";
import DropdownDate from "./Components.DropdownDate";

function SankeyDress({
  endpoint,
  overview = false,
  children,
  isEndpoint = false,
  periodSelection = "monthly",
  chartData,
  onPeriodSelection = () => {},
}) {
  const [starfieldRendered, setStarfieldRendered] = useState(false);
  const starfieldRef = useRef();

  useEffect(() => {
    if (!starfieldRendered) {
      starfieldRef.current = (
        <Starfield
          starCount={3000}
          starColor={[105, 105, 105]}
          speedFactor={0.01}
          backgroundColor="#000"
        />
      );
      setStarfieldRendered(true);
    }
  }, [starfieldRendered]);

  const divRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === divRef.current) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
    };
  }, []);

  const LabelDesign = () => (
    <>
      <div className="flex text-sm w-full z-20 px-3">
        <div className="flex  w-[12%] ">Origin</div>
        <div className="flex flex-grow justify-center">Content</div>
        <div className="flex flex-grow justify-center">Host</div>
        <div className="flex flex-grow justify-center">Endpoint</div>
        <div className="flex w-[12%] justify-end">Method</div>
      </div>
      <div
        style={{
          top: -15,
          bottom: 0,
          left: 0,
          right: 0,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        className="absolute w-full flex justify-between"
      >
        <div
          style={{
            width: 1,
            height: "100%",
            borderLeftWidth: 6,
            borderLeftColor: "#191A21",
          }}
        />
        <div
          style={{
            width: 1,
            height: "100%",
            borderLeftWidth: 6,
            borderLeftColor: "#191A21",
          }}
        />
        <div
          style={{
            width: 1,
            height: "100%",
            borderLeftWidth: 6,
            borderLeftColor: "#191A21",
          }}
        />
        <div
          style={{
            width: 1,
            height: "100%",
            borderLeftWidth: 6,
            borderLeftColor: "#191A21",
          }}
        />
        <div
          style={{
            width: 1,
            height: "100%",
            borderLeftWidth: 6,
            borderLeftColor: "#191A21",
          }}
        />
      </div>
    </>
  );

  const NetworkAnalysisHeader = () => (
    <div className="flex flex-row w-full p-2 pr-4 items-center dash-card z-20">
      <h2 className="pl-2 uppercase text-xs text-slate-800 dark:text-slate-100 ">
        Network Analysis ({periodSelection})
      </h2>
      <div className="flex flex-grow" />
      <div className="gap-2 flex justify-center">
        <DropdownDate
          selection={periodSelection}
          onSelect={onPeriodSelection}
        />
        {periodSelection === "custom" && <Datepicker />}
      </div>
    </div>
  );

  return (
    <div ref={divRef} className="flex-grow flex flex-col space-y-4 z-20">
      <NetworkAnalysisHeader />
      {children}
      {isEndpoint ? (
        <div className="flex-grow flex-col space-y-4 flex dash-card grid-test z-10">
          <div className="p-4">
            <h2 className=" uppercase text-xs text-slate-800 dark:text-slate-100 ">
              Endpoint Requests ({periodSelection})
            </h2>
            <text className="text-xs">Requests in the past 12 hours</text>
          </div>
          <CardinalAreaChartLarge chartData={chartData} parentSize={size} />
        </div>
      ) : (
        <div className="flex-grow flex-col space-y-4 flex p-4 dash-card grid-test z-10">
          <SankeyComponent chartData={chartData} parentSize={size} />
          <LabelDesign />
          {starfieldRendered && starfieldRef.current}
        </div>
      )}
    </div>
  );
}

export default SankeyDress;

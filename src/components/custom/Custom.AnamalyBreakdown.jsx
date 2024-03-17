import React from "react";
import BarChart from "../charts/Charts.BarChart03";

// Import utilities

function AnamalyBreakdown({eventListChart}) {
  return (
    <div className="col-span-full xl:col-span-6  mainDark shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Anamaly Breakdown
        </h2>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            {eventListChart.datasets?.length}
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {Object.keys(eventListChart).length > 0 && (
          <BarChart data={eventListChart} width={595} height={48} />
        )}
      </div>
    </div>
  );
}

export default AnamalyBreakdown;

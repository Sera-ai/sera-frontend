import React, { useContext } from 'react';
import BarChart from '../charts/Charts.BarChart01';

// Import utilities
import { AppContext } from '../../provider/Provider.State';

function BarGraph({ bare = false }) {

  const { monthlyAnalytics } = useContext(AppContext)

  return (
    <div className={`flex flex-col w-full h-full col-span-full  ${bare ? "mainDark mt-4" : "mainDark shadow-lg rounded-sm border border-slate-200 dark:border-slate-700"} `}>
      <header className={`px-5 py-4 border-b border-slate-100 dark:border-slate-700 ${bare && "hidden"}`}>
        <div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Monthly Analytics</h2>
          <h2 className="font-light text-slate-800 dark:text-slate-100 text-sm">Overview of key information about the active endpoints in your inventory.</h2>
        </div>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={monthlyAnalytics} width={595} height={248} bare={bare} />
    </div>
  );
}

export default BarGraph;

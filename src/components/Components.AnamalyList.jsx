import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../provider/Provider.State";
import { FilterIcon, WarningIcon } from "./standard/Standard.Icons";

function AnamalyList({ bare = false, full = false }) {
  const [filter, setFilter] = useState("");
  const { anamalyListData } = useContext(AppContext);

  const filteredData = anamalyListData.filter(
    (channel) =>
      channel.endpoint.endpoint.toLowerCase().includes(filter.toLowerCase()) ||
      channel.endpoint.host.toLowerCase().includes(filter.toLowerCase()) ||
      channel.details.code.toLowerCase().includes(filter.toLowerCase()) ||
      channel.details.desc.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div
      className={`col-span-2 row-span-2 md:col-span-2 sm:col-span-3 xs:col-span-3 ${
        bare ? "mainDark mt-6" : "dash-card"
      }`}
    >
      <header className={` ${!bare && "p-4 px-6"} `}>
        <div className="flex justify-between items-center">
          <div>
            <h2
              className={`font-semibold text-slate-800 dark:text-slate-100 ${
                bare && "text-sm"
              }`}
            >
              Endpoint Anamalies
            </h2>
            <h2
              style={bare ? { color: "rgba(255, 255, 255, 0.6)" } : {}}
              className={`font-light text-slate-800 dark:text-slate-100 ${
                bare ? "text-xs" : "text-sm"
              }`}
            >
              Overview of key information about the active endpoints in your
              inventory.
            </h2>
          </div>
        </div>
      </header>
      <div className=" mt-1 h-full">
        {/* Table */}
        <div
          className={`overflow-x-auto ${
            full ? "max-h-[40vh]" : "max-h-[600px]"
          } overflow-y-scroll`}
        >
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead
              className={`text-xs uppercase text-slate-400 dark:text-slate-500 ${
                bare ? "mainDark" : "quadDark"
              } dark:bg-opacity-50 rounded-sm sticky top-0`}
            >
              <tr>
                <th className="px-2 pl-6">
                  <div className="font-semibold text-left">Anamoly</div>
                </th>
                <th className="px-2">
                  <div className="font-semibold text-left">Host/Endpoint</div>
                </th>
                <th className="px-2 flex  items-center w-full">
                  <div className="font-semibold text-left">Datetime</div>
                  <div className="w-full"></div>
                  <form style={{ minWidth: "250px" }}>
                    <div className="relative">
                      <label className="sr-only">Search</label>
                      <input
                        className={`w-full dark:text-slate-300 font-light ${
                          bare ? "mainDark" : "quadDark"
                        } text-sm border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-2 pl-10 pr-4`}
                        type="search"
                        placeholder="Filter Recent Anomalies"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      />
                      <button
                        className="absolute inset-0 right-auto group"
                        type="submit"
                        aria-label="Search"
                      >
                        <FilterIcon />
                      </button>
                    </div>
                  </form>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {filteredData.map((channel, index) => (
                <tr key={index}>
                  <td className="p-2 pl-6 flex items-center space-x-3">
                    <WarningIcon />
                    <div className="flex flex-col">
                      {/* The SVG icons can be moved to the data structure and rendered here */}
                      <div className="text-slate-800 dark:text-slate-100">
                        {channel.details.code}
                      </div>
                      <div className="text-slate-800 text-xs dark:text-slate-100">
                        {channel.details.desc}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      {/* The SVG icons can be moved to the data structure and rendered here */}
                      <div className="text-slate-800 dark:text-slate-100">
                        {channel.endpoint.host}
                      </div>
                      <div className="text-slate-800 text-xs dark:text-slate-100">
                        {channel.endpoint.endpoint}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-emerald-500">
                      {formatDate(channel.date)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnamalyList;

function formatDate(timestamp) {
  const ts = timestamp * 1000;
  const date = new Date(ts);

  // Format date to "03 January, 2023"
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  // Format time to "4:32:01 PM"
  const formattedTime = date.toLocaleTimeString("en-US");

  // Calculate "time ago"
  const now = new Date();
  const diffInSeconds = Math.round((now - date) / 1000);
  let timeAgo;

  if (diffInSeconds < 60) {
    timeAgo = `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 60 * 60) {
    const diffInMins = Math.round(diffInSeconds / 60);
    timeAgo = `${diffInMins} minutes ago`;
  } else if (diffInSeconds < 3600 * 48) {
    const diffInHours = Math.round(diffInSeconds / 3600);
    timeAgo = `${diffInHours} hours ago`;
  } else if (diffInSeconds < 3600 * 24 * 14) {
    const diffInDays = Math.round(diffInSeconds / (3600 * 24));
    timeAgo = `${diffInDays} days ago`;
  } else if (diffInSeconds < 3600 * 24 * 7 * 52) {
    const diffInWeeks = Math.round(diffInSeconds / (3600 * 24 * 7));
    timeAgo = `${diffInWeeks} weeks ago`;
  } else {
    const diffInYears = Math.round(diffInSeconds / (3600 * 24 * 365.25)); // Considering leap years
    timeAgo = `${diffInYears} years ago`;
  }

  return `${formattedDate} ${formattedTime} (${timeAgo})`;
}

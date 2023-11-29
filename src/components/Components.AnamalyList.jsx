import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../provider/Provider.State';

function AnamalyList({ bare = false, full = false }) {
  const [filter, setFilter] = useState('');
  const { anamalyListData } = useContext(AppContext);

  const filteredData = anamalyListData.filter(channel =>
    (channel.endpoint.endpoint.toLowerCase().includes(filter.toLowerCase()))
    || (channel.endpoint.host.toLowerCase().includes(filter.toLowerCase()))
    || (channel.details.code.toLowerCase().includes(filter.toLowerCase()))
    || (channel.details.desc.toLowerCase().includes(filter.toLowerCase()))
  );
  return (
    <div className={`col-span-full ${bare ? "mainDark" : "mainDark shadow-lg rounded-sm border border-slate-200 dark:border-slate-700"} mt-6`}>
      <header className={` ${!bare && "py-4 border-b border-slate-100 dark:border-slate-700"} `}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className={`font-semibold text-slate-800 dark:text-slate-100 ${bare && "text-sm"}`}>Endpoint Anamalies</h2>
            <h2
              style={bare ? { color: "rgba(255, 255, 255, 0.6)" } : {}}
              className={`font-light text-slate-800 dark:text-slate-100 ${bare ? "text-xs" : "text-sm"}`}
            >Overview of key information about the active endpoints in your catalogue.</h2>
          </div>

        </div>
      </header>
      <div className=" mt-1">
        {/* Table */}
        <div className={`overflow-x-auto ${full ? "max-h-[40vh]" : "max-h-[500px]"} overflow-y-auto`}>
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className={`text-xs uppercase text-slate-400 dark:text-slate-500 ${bare ? "mainDark" : "secondaryDark"} dark:bg-opacity-50 rounded-sm sticky top-0`}>
              <tr>
                <th className="px-2">
                  <div className="font-semibold text-left">Anamoly</div>
                </th>
                <th className="px-2">
                  <div className="font-semibold text-left">Host/Endpoint</div>
                </th>
                <th className="px-2 flex flex-column items-center w-full">
                  <div className="font-semibold text-left">Datetime</div>
                  <div className="w-full"></div>
                  <form style={{ minWidth: "250px" }}>
                    <div className="relative">
                      <label className="sr-only">
                        Search
                      </label>
                      <input
                        className={`w-full dark:text-slate-300 font-light ${bare ? "mainDark" : "secondaryDark"} text-sm border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-2 pl-10 pr-4`}
                        type="search"
                        placeholder="Filter Recent Anomalies"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      />
                      <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                        <svg
                          className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                          <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                        </svg>
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
                  <td className="p-2 flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9.16663 12.5H10.8333V14.1666H9.16663V12.5ZM9.16663 5.83329H10.8333V10.8333H9.16663V5.83329ZM9.99996 1.66663C5.39163 1.66663 1.66663 5.41663 1.66663 9.99996C1.66663 12.2101 2.5446 14.3297 4.1074 15.8925C4.88122 16.6663 5.79988 17.2802 6.81093 17.699C7.82198 18.1177 8.90561 18.3333 9.99996 18.3333C12.2101 18.3333 14.3297 17.4553 15.8925 15.8925C17.4553 14.3297 18.3333 12.2101 18.3333 9.99996C18.3333 8.90561 18.1177 7.82198 17.699 6.81093C17.2802 5.79988 16.6663 4.88122 15.8925 4.1074C15.1187 3.33358 14.2 2.71975 13.189 2.30096C12.1779 1.88217 11.0943 1.66663 9.99996 1.66663ZM9.99996 16.6666C8.23185 16.6666 6.53616 15.9642 5.28591 14.714C4.03567 13.4638 3.33329 11.7681 3.33329 9.99996C3.33329 8.23185 4.03567 6.53616 5.28591 5.28591C6.53616 4.03567 8.23185 3.33329 9.99996 3.33329C11.7681 3.33329 13.4638 4.03567 14.714 5.28591C15.9642 6.53616 16.6666 8.23185 16.6666 9.99996C16.6666 11.7681 15.9642 13.4638 14.714 14.714C13.4638 15.9642 11.7681 16.6666 9.99996 16.6666Z" fill="#ECB62B" />
                    </svg>
                    <div className="flex flex-col">
                      {/* The SVG icons can be moved to the data structure and rendered here */}
                      <div className="text-slate-800 dark:text-slate-100">{channel.details.code}</div>
                      <div className="text-slate-800 text-xs dark:text-slate-100">{channel.details.desc}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      {/* The SVG icons can be moved to the data structure and rendered here */}
                      <div className="text-slate-800 dark:text-slate-100">{channel.endpoint.host}</div>
                      <div className="text-slate-800 text-xs dark:text-slate-100">{channel.endpoint.endpoint}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-emerald-500">{formatDate(channel.date)}</div>
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
  const ts = timestamp * 1000
  const date = new Date(ts);

  // Format date to "03 January, 2023"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);

  // Format time to "4:32:01 PM"
  const formattedTime = date.toLocaleTimeString('en-US');

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
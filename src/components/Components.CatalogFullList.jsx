import React, { useState, useContext } from 'react';
import FilterButton from './Components.DropdownFilter';
import { AppContext } from '../provider/Provider.State';


function CatalogFullList() {
  const [filter, setFilter] = useState('');

  const { catalogInventory } = useContext(AppContext);

  const filteredData = catalogInventory.filter(channel => {
    return channel.endpoint.endpoint.toLowerCase().includes(filter.toLowerCase())
      || channel.endpoint.host.toLowerCase().includes(filter.toLowerCase())
      || channel.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())); // Updated this part for tags
  });

  const allExpanded = filteredData.reduce((acc, channel) => {
    acc[channel.endpoint.host] = true;
    return acc;
  }, {});

  const [expandedRows, setExpandedRows] = useState(allExpanded); // e.g., { 0: true, 1: false } means row 0 is expanded, row 1 is collapsed

  const groupByHost = filteredData.reduce((acc, channel) => {
    if (!acc[channel.endpoint.host]) {
      acc[channel.endpoint.host] = [];
    }
    acc[channel.endpoint.host].push(channel);
    return acc;
  }, {});


  const toggleGroup = (host) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [host]: !prevState[host]
    }));
  };


  return (
    <div className="col-span-full h-full w-full">
      <div className='h-full w-full mainDark'>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 mainDark dark:bg-opacity-50 rounded-sm sticky top-0">
              <tr>
                <th className="p-2">
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Endpoint</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Health</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Requests</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Tags</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {Object.entries(groupByHost).map(([host, hostData]) => (
                <React.Fragment key={host}>
                  {/* Header Row with the "+" sign */}
                  <tr className="rowItemLight" style={{ backgroundColor: "#ffffff05" }}>
                    <td onClick={() => toggleGroup(host)} className="p-2 text-center cursor-pointer">
                      {expandedRows[host] ? "-" : "+"}
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <div className="text-slate-800 dark:text-slate-100">{host}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-row items-center space-x-2.5">
                        {/* Health Bar */}
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded">
                          <div className="h-full bg-blue-500 rounded" style={{ width: `${.99 * 100}%` }}></div>
                        </div>
                        {/* Percentage */}
                        <div className="text-center text-xs">{Math.round(.99 * 100)}%</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{(502983).toLocaleString()}</div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {/* Conditionally render all entries for the host when expanded */}
                  {expandedRows[host] &&
                    hostData.map((channel, index) => (
                      <React.Fragment key={index}>
                        {/* Rows related to each endpoint under the host */}
                        <tr className="mainDark rowItem">
                          <td> </td>
                          <td className="p-2">
                            <div className="flex flex-col">
                              <div className="text-slate-800 text-xs dark:text-slate-100 pl-5">{channel.endpoint.endpoint}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex flex-row items-center space-x-2.5">
                              {/* Health Bar */}
                              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded">
                                <div className="h-full bg-blue-500 rounded" style={{ width: `${channel.health * 100}%` }}></div>
                              </div>
                              {/* Percentage */}
                              <div className="text-center text-xs">{Math.round(channel.health * 100)}%</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{channel.requests.toLocaleString()}</div>
                          </td>
                          <td className="p-2">
                            <div className="flex justify-center">
                              <span
                                className={`inline-flex items-center px-1 py-0.5 text-xs text-white rounded`}
                                style={channel.status === 'active' ? { backgroundColor: '#23A85830', color: "#23A858" } : { backgroundColor: '#EC2B2B30', color: "#EC2B2B" }}
                              >
                                {channel.status}
                              </span>
                            </div>
                          </td>

                          <td className="p-2">
                            <div className="flex flex-wrap gap-2">
                              {channel.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-1 py-0.5 text-xs text-white rounded"
                                  style={{ backgroundColor: '#007BFF30', color: "#007BFF" }} // Adjust color values if needed
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CatalogFullList;

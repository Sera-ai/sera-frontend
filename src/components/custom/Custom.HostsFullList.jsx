import React from "react";

function HostFullList({ filter, apiInventory }) {
  const filteredData = apiInventory.filter((inventory) => {
    return inventory.host.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="col-span-full h-full w-full">
      <div className="h-full w-full mainDark">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 mainDark dark:bg-opacity-50 rounded-sm sticky top-0">
              <tr className="pl-4">
                {Object.keys(apiInventory[0]).map((key, index) => {
                  return (
                    <th className={`p-2 ${index == 0 && " pl-8"}`}>
                      <div
                        className={`font-semibold text-${
                          index == 0 ? "left" : "center"
                        }`}
                      >
                        {key}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {Object.keys(filteredData).map((data) => (
                <React.Fragment key={filteredData[data].host}>
                  {/* Header Row with the "+" sign */}
                  <tr
                    className="rowItemLight"
                    style={{ backgroundColor: "#ffffff05" }}
                  >
                    <td className="p-2 pl-8">
                      <div className="flex flex-col">
                        <a
                          href={`/editor/${filteredData[data].host}/`}
                          className="text-slate-800 dark:text-slate-100"
                        >
                          {filteredData[data].host}
                        </a>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-row items-center gap-2">
                        {/* Health Bar */}
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded">
                          <div
                            className="h-full bg-blue-500 rounded"
                            style={{
                              width: `${
                                filteredData[data].documentation * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        {/* Percentage */}
                        <div className="text-center text-xs">
                          {Math.round(filteredData[data].documentation * 100)}%
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {filteredData[data].requests.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {filteredData[data].endpoints}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HostFullList;

import React, { useState, useContext, useEffect } from "react";
import BarGraph from "../../../../components/custom/Custom.MonthlyAnalytics";
import { AppContext } from "../../../../provider/Provider.State";
import SankeyDress from "../../../../components/Components.SankeyDress";
import { useLocation } from "react-router-dom";
import { getHostInfo, getUsageGraph } from "../../../../provider/Provider.Data";

function CatalogDetailsData({
  isEndpoint,
  setPeriodSelection,
  periodSelection,
  endpointSankeyChart,
}) {
  const location = useLocation();

  const [usageGraph, setUsageGraph] = useState(null);
  const [hostInfo, setHostInfo] = useState(null);
  const [method, setMethod] = useState(null);

  useEffect(() => {
    const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"];
    const { pathname } = location;

    async function getAnalyticsData() {
      setUsageGraph(null);
      try {
        const paths2 = decodeURIComponent(pathname).split("/");
        paths2.shift(); //remove blank
        paths2.shift(); //remove inventory

        if (matchMethod.includes(paths[paths.length - 1])) {
          paths2.pop();
        }

        if (paths2[0] != "" && paths2[0] != undefined) {
          console.log(paths2[0]);
          const host = paths2[0];
          paths2.shift();
          paths2.pop();

          let params = {
            period: periodSelection,
            host: host,
            method: method,
          };

          if (paths2.length > 0) {
            params.path = "/" + paths2.join("/");
          }
          const searchResult = await getUsageGraph(params);
          const hostInfoResult = await getHostInfo(params);
          if (searchResult && hostInfoResult) {
            if (searchResult.usageGraph?.length > 0)
              setUsageGraph(searchResult.usageGraph);

            console.log(hostInfoResult);
            if (hostInfoResult && Object.keys(hostInfoResult).length != 0)
              setHostInfo(hostInfoResult.hostData);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    const paths = decodeURIComponent(pathname).split("/");
    if (matchMethod.includes(paths[paths.length - 1])) {
      setMethod(paths.pop().replace("__", "").toUpperCase());
    }

    getAnalyticsData();
  }, [periodSelection, location]);

  const tableData = (data, index, total) => {
    let returnData;
    switch (typeof data) {
      case "object":
        returnData = data.map((tag) => tag).join(", ");
        break;
      case "string":
        returnData = data;
        break;
      default:
        returnData = data;
        break;
    }

    if (index == 0) {
      return (
        <span
          className={`inline-flex items-center px-1 py-0.5 text-xs text-white rounded`}
          style={
            data.toLowerCase() === "active"
              ? { backgroundColor: "#23A85830", color: "#23A858" }
              : { backgroundColor: "#EC2B2B30", color: "#EC2B2B" }
          }
        >
          {returnData}
        </span>
      );
    } else if (index == total - 1) {
      return data.map((tag, index) => (
        <React.Fragment key={index}>
          <h2
            style={{ color: "#2B84EC" }}
            className="text-xs text-slate-800 dark:text-slate-100 underline cursor-pointer"
          >
            {tag}
          </h2>
          {index !== data.length - 1 && (
            <span className="px-1 cursor-default"> , </span>
          )}
        </React.Fragment>
      ));
    } else {
      return returnData;
    }
  };

  return (
    <div className="p-4 flex flex-col h-full w-full">
      <SankeyDress
        isEndpoint={isEndpoint}
        onPeriodSelection={setPeriodSelection}
        periodSelection={periodSelection}
        chartData={isEndpoint ? usageGraph : endpointSankeyChart}
      >
        <div className="flex flex-column space-x-10 w-full py-2">
          <div className=" w-full">
            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
              {isEndpoint ? "Endpoint" : "Host"} Details
            </h2>
            <h2
              style={{ color: "#ffffff99" }}
              className="text-xs text-slate-800 dark:text-slate-100"
            >
              {isEndpoint ? "Endpoint" : "Host"} specific details
            </h2>

            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 mainDark dark:bg-opacity-50 rounded-sm sticky top-0">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-center"></div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center"></div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {hostInfo &&
                  Object.keys(hostInfo?.["details"]).map((obj, index) => (
                    <React.Fragment key={index}>
                      {/* Rows related to each endpoint under the host */}
                      <tr className="mainDark rowItem noborder">
                        <td className="pr-3">
                          <div className="flex flex-col">
                            <div
                              style={{ color: "#ffffff99" }}
                              className="text-slate-800 text-xs dark:text-slate-100"
                            >
                              {obj}
                            </div>
                          </div>
                        </td>

                        <td className="p-1">
                          <div className="flex flex-wrap gap-2">
                            <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">
                              {tableData(
                                hostInfo?.["details"][obj],
                                index,
                                Object.keys(hostInfo?.["details"]).length
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          <div className=" w-full">
            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
              {isEndpoint ? "Endpoint" : "Host"} Statistics
            </h2>
            <h2
              style={{ color: "#ffffff99" }}
              className="text-xs text-slate-800 dark:text-slate-100"
            >
              Statistics available for this {isEndpoint ? "Endpoint" : "Host"}
            </h2>

            <table className="table-fixed w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 mainDark dark:bg-opacity-50 rounded-sm sticky top-0">
                <tr>
                  <th className="p-2 w-1/3">
                    {" "}
                    {/* Adjust the width as needed */}
                    <div className="font-semibold text-center"></div>
                  </th>
                  <th className="p-2 w-2/3">
                    {" "}
                    {/* The rest of the table space */}
                    <div className="font-semibold text-center"></div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {hostInfo &&
                  Object.keys(hostInfo?.["statistics"]).map((obj, index) => (
                    <tr key={index} className="mainDark rowItem noborder">
                      <td className="pr-3">
                        <div className="flex flex-col">
                          <div
                            style={{ color: "#ffffff99" }}
                            className="text-slate-800 text-xs dark:text-slate-100"
                          >
                            {obj}
                          </div>
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="flex flex-wrap gap-2">
                          <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">
                            {hostInfo?.["statistics"][obj]}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </SankeyDress>
    </div>
  );
}

export default CatalogDetailsData;

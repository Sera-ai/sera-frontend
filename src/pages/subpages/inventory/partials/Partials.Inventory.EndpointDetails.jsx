import React, { useState, useContext } from "react";
import BarGraph from "../../../../components/custom/Custom.MonthlyAnalytics";
import { AppContext } from "../../../../provider/Provider.State";

function CatalogDetailsData({ endpoint }) {
  const { endpointDetails } = useContext(AppContext);

  console.log(endpoint);
  if (!endpointDetails[endpoint]) {
    return;
  }

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
      <div className="flex flex-column space-x-3 items-center">
        <h2
          style={{ color: "#ffffff99" }}
          className="text-xs text-slate-800 dark:text-slate-100"
        >
          Last call <span style={{ color: "#23A858" }}>39 seconds ago</span>
        </h2>
        <div
          style={{
            width: "0.5px",
            height: "14px",
            transformOrigin: "0 0",
            border: "0.01em #ffffff40 solid",
          }}
        ></div>
        <h2
          style={{ color: "#2B84EC" }}
          className="text-xs text-slate-800 dark:text-slate-100 underline cursor-pointer"
        >
          Retrieve Endpoint Report
        </h2>
      </div>
      <div className="flex flex-column space-x-10 w-full py-6">
        <div className=" w-full">
          <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
            Endpoint Details
          </h2>
          <h2
            style={{ color: "#ffffff99" }}
            className="text-xs text-slate-800 dark:text-slate-100"
          >
            Endpoint specific details
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
              {Object.keys(endpointDetails[endpoint]["details"]).map(
                (obj, index) => (
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
                              endpointDetails[endpoint]["details"][obj],
                              index,
                              Object.keys(
                                endpointDetails[endpoint]["details"]
                              ).length
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className=" w-full">
          <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
            Endpoint Statistics
          </h2>
          <h2
            style={{ color: "#ffffff99" }}
            className="text-xs text-slate-800 dark:text-slate-100"
          >
            Statistics available for this endpoint
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
              {Object.keys(endpointDetails[endpoint]["statistics"]).map(
                (obj, index) => (
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
                          {endpointDetails[endpoint]["statistics"][obj]}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-column space-x-10 w-full">
        {/*<BarGraph bare={true} />*/}
      </div>
    </div>
  );
}


export default CatalogDetailsData;



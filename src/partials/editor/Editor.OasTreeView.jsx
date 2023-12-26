import React, { useState, useCallback } from "react";

const EditorOasTreeView = ({ oas, filter }) => {
  const headers = ["Key", "Value", "Type", "Last Read", "Last Write"];
  //     const filteredData = apiInventory.filter((oas) => {
  //     return inventory.host.toLowerCase().includes(filter.toLowerCase());
  //   });

  const RecursiveRow = ({ data, depth = 1 }) => {
    return (
      <>
        {Object.keys(data).map((key) => {
          const value = data[key];
          const isObject = typeof value === 'object' && value !== null;
          const paddingLeft = depth * 20 + 10; // Increase indentation for nested objects
  
          return (
            <React.Fragment key={key}>
              <tr className="text-xs" style={{ backgroundColor: "#ffffff05" }}>
                {/* Key cell with optional expand icon */}
                <td className="p-1 flex flex-row items-center" style={{ paddingLeft }}>
                  {isObject && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="13"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M4.5 6.75L9 11.25L13.5 6.75"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <a className={`text-slate-800 dark:text-slate-${isObject ? "100" : "400"}`}>{key}</a>
                </td>
  
                {/* Value cell */}
                <td className="p-1 pl-8">
                  <div className="flex flex-col">
                    <a className={`text-slate-800 dark:text-slate-${isObject ? "100" : "400"}`}>
                      {isObject
                        ? `{ ${Object.keys(value).length} field${Object.keys(value).length > 1 ? "s" : ""} }`
                        : value}
                    </a>
                  </div>
                </td>
  
                {/* Type cell */}
                <td className="p-1">
                  <div className={`text-center capitalize dark:text-slate-100`}>{isObject ? "object" : typeof value}</div>
                </td>
  
                {/* Timestamp cells */}
                <td className="p-1">
                  <div className="text-center">{new Date().toLocaleString()}</div>
                </td>
                <td className="p-1">
                  <div className="text-center">{new Date().toLocaleString()}</div>
                </td>
              </tr>
  
              {/* Recursive call for nested objects */}
              {isObject && <RecursiveRow data={value} depth={depth + 1} />}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
        <div className="h-full w-full mainDark overflow-auto">
          <table className={"issuesTable w-full"}>
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 mainDark dark:bg-opacity-50 rounded-sm sticky top-0">
              <tr className="pl-4">
                {headers.map((key, index) => {
                  return (
                    <th className={`p-1 ${index == 0 && " pl-8"}`}>
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
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700 mb-2">
              <RecursiveRow data={oas} />
            </tbody>
          </table>
        </div>
  );
};

export default EditorOasTreeView;

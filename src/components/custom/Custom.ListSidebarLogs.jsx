import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../provider/Provider.State";
import { LeftIcon } from "../../assets/assets.svg";

export function ListSideBarLogs({
  logSources = [],
  selectedEndpoint,
  setLogType,
  children = null,
}) {
  const [openPaths, setOpenPaths] = useState({});

  if (logSources.length < 0) {
    return <div></div>;
  }

  const togglePath = (path) => {
    setOpenPaths((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  let eps = {};

  Object.keys(logSources).forEach((item) => {
    if (item.type) {
      const type = item.type;
      eps[type] = (eps[type] || 0) + 1; // Simplified way to increment or initialize the count
    }
  });

  const GetOasData = ({ logSources }) => {
    const setEndpoint = (ep) => {
      console.log("set selected endpoint", ep);
      setLogType(ep)
    };
    return Object.keys(logSources).map((key) => {
      const name = key;
      const isOpen = openPaths[name];
      return (
        <div key={name}>
          <div
            className={`flex flex-row justify-between items-center py-1.5 px-4 listItemLink`}
            onClick={() => togglePath(name)}
          >
            <span className={`text-xs`}>{name}</span>
            <span className={`text-xs uppercase`}>
              <svg
                style={{
                  transform: `rotate(${isOpen ? "0deg" : "-90deg"})`,
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M0.583497 0.249918C0.736275 0.0971401 0.930718 0.0207516 1.16683 0.0207516C1.40294 0.0207516 1.59739 0.0971402 1.75016 0.249918L5.00016 3.49992L8.25016 0.249918C8.40294 0.0971405 8.59739 0.0207519 8.8335 0.0207519C9.06961 0.0207519 9.26405 0.0971405 9.41683 0.249918C9.56961 0.402696 9.646 0.59714 9.646 0.833251C9.646 1.06936 9.56961 1.26381 9.41683 1.41659L5.5835 5.24992C5.50016 5.33325 5.40989 5.39242 5.31266 5.42742C5.21544 5.46242 5.11127 5.47964 5.00016 5.47909C4.88905 5.47909 4.78489 5.46158 4.68766 5.42658C4.59044 5.39158 4.50016 5.3327 4.41683 5.24992L0.583497 1.41659C0.430719 1.26381 0.354329 1.06936 0.354329 0.833251C0.354329 0.59714 0.430719 0.402696 0.583497 0.249918Z"
                  fill="#fff"
                  fillOpacity="0.7"
                />
              </svg>
            </span>
          </div>
          {isOpen && (
            <div>
              {logSources[key].map((entry) => (
                <div
                  key={name + "/" + entry}
                  className={`flex flex-row justify-between items-center py-1.5 px-4 pl-8 listItemLink ${
                    "/" + selectedEndpoint == name + "/" + entry && "mainDark"
                  }`}
                  onClick={() => setEndpoint(entry)}
                >
                  <span
                    className={`text-xs ${
                      "/" + selectedEndpoint == name + "/" + entry &&
                      "blue-color"
                    }`}
                  >
                    {entry}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="dash-card w-[250px] min-w-[250px] text-sm text-white">
      <div className="text-sm text-white py-4">
        <div className="flex flex-row justify-between pb-2 px-4">
          <span className="text-xs uppercase">Log Source</span>
        </div>
        <GetOasData logSources={logSources} />
      </div>
      {children && (
        <>
          <hr className="w-full h-1 bg-slate-200 mainDark border-none " />
          {children}
        </>
      )}
    </div>
  );
}

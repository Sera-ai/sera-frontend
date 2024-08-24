import React, { useState, useContext } from "react";
import { AppContext } from "../../provider/Provider.State";

export function EventBar({
  endpoint = "inventory/api.sample.com/pets/__post",
  inventory = [],
  host = "",
  showBlock = true,
  setSelectedEndpoint,
  selectedEndpoint,
  showHost = false,
  children = null,
}) {
  const { endpointDetails } = useContext(AppContext);
  const [openPaths, setOpenPaths] = useState({}); // State to track open paths

  if (!endpointDetails[endpoint]) {
    return <div>No endpoint details available.</div>;
  }

  const togglePath = (path) => {
    setOpenPaths((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const GetList = () => {
    // Assuming dummyData is the name of your new data structure
    const dummyData = {
      Sera: [
        "Default Sera Playbook",
      ],
      Builder: [
        "Default Builder Playbook",
      ],
      Log: [
        "Default Log Playbook",
      ],
    };

    return Object.entries(dummyData).map(([category, paths]) => {
      const isOpenCategory = openPaths[category]; // Adjust based on how you plan to track open states

      return (
        <div key={category}>
          <div
            className="flex flex-row justify-between items-center py-1.5 px-4 listItemLink"
            onClick={() => togglePath(category)} // Adjust toggle function to work with categories
          >
            <span className="text-xs">{category} Events</span>
            <span className={`text-xs uppercase`}>
              <svg
                style={{
                  transform: `rotate(${isOpenCategory ? "0deg" : "-90deg"})`,
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
          {isOpenCategory && (
            <div className="flex flex-col pl-4 listItemLink text-xs">
              {paths.map((path) => (
                <div
                  key={path}
                  className={`flex flex-row justify-between items-center py-1.5 px-4 pl-4 listItemLink`}
                >
                  {path}
                  <div
                    style={{
                      borderRadius: 10,
                      height: 7,
                      width: 7,
                      border: `1px solid #4bff80`,
                      backgroundColor: "#111",
                    }}
                  />
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
      {showBlock && (
        <>
          <div
            className="px-4 flex flex-row items-center h-[56px] justify-between cursor-pointer"
            onClick={() => {
              setSelectedEndpoint("");
            }}
          >
            <span className="text-xs uppercase">{host}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                d="M17.875 5.22983C18.2187 5.46529 18.5041 5.7488 18.7018 6.09119C18.8995 6.43357 19.0025 6.82246 19 7.21783V14.5018C19 15.3108 18.557 16.0568 17.842 16.4498L11.092 20.7198C10.7574 20.9036 10.3818 20.9999 10 20.9999C9.61824 20.9999 9.24224 20.9036 8.908 20.7198L2.158 16.4498C1.80817 16.2587 1.51612 15.977 1.31241 15.6343C1.1087 15.2916 1.0008 14.9005 1 14.5018V7.21683C1 6.40783 1.443 5.66283 2.158 5.22983L8.908 1.28983C9.25254 1.09987 9.63956 1.00024 10.033 1.00024C10.4224 1.00024 10.8135 1.09987 11.158 1.28983L17.908 5.22983H17.875Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 8.42174C13.812 8.60174 14.003 8.93674 14 9.29774V12.5747C14 12.9387 13.803 13.2747 13.485 13.4517L10.485 15.3737C10.3366 15.456 10.1697 15.4992 10 15.4992C9.83031 15.4992 9.6634 15.456 9.515 15.3737L6.515 13.4517C6.35872 13.3651 6.22851 13.2381 6.13794 13.084C6.04737 12.93 5.99974 12.7545 6 12.5757V9.29774C6 8.93374 6.197 8.59774 6.514 8.42074L9.514 6.63074C9.825 6.45674 10.204 6.45674 10.514 6.63074L13.514 8.42074H13.5V8.42174Z"
                stroke="#2B84EC"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <hr className="w-full h-1 bg-slate-200 mainDark border-none " />
        </>
      )}
      <div className="text-sm text-white py-4">
        <div className="flex flex-row justify-between pb-2 px-4">
          <span className="text-xs">Event</span>
          <span className="text-xs">Active</span>
        </div>
        <GetList />
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

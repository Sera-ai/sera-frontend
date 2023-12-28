import React, { useState } from 'react';
import InventoryDetailsData from '../../pages/subpages/inventory/Sub.Inventory.DetailsData';
import AnamalyList from '../../components/Components.AnamalyList';
import ProxySettings from '../../components/Components.ProxySettings';
import PluginComponent from '../../components/Components.PluginComponent';
import { Link, useLocation } from 'react-router-dom';



function ApiDetails() {

  const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"]

  const location = (useLocation());
  const { pathname } = location;
  const paths = decodeURIComponent(pathname).split("/")
  const endpoint = decodeURIComponent(pathname)
  paths.shift() //remove blank
  paths.shift() //remove inventory
  let method = null

  if (matchMethod.includes(paths[paths.length - 1])) {
    method = (paths.pop()).replace("__", "").toUpperCase()
  }

  return (
    <div className="col-span-full mainDark px-8 py-4 h-full overflow-y-scroll">
      <Header paths={paths} method={method} />
      <div>
        {/* Table */}
        <div className="overflow-x-auto flex flex-col">
          <div className="overflow-x-auto flex flex-column w-full">
            {/* Data Div */}
            <div className="flex w-full h-full">
              <InventoryDetailsData endpoint={endpoint} />
            </div>

            {/* Action Div */}
          </div>
          <div className="p-2">
            <AnamalyList bare={true} />
          </div>
        </div>
      </div>
    </div >
  );
}

export default ApiDetails;


function EndpointSettings({ endpoint }) {
  return (
    <div className="secondaryDark rounded-lg ml-2 mt-2 p-4 detailsActionContainer2">

      <div>
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Proxy Settings</h2>
        <h2 className="font-regular text-xs text-slate-800 dark:text-slate-100">Edit this endpoints plugin settings</h2>
        <ProxySettings endpoint={endpoint} />
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Plugin Settings</h2>
        <h2 className="font-regular text-xs text-slate-800 dark:text-slate-100">Edit this endpoints plugin settings</h2>
        <PluginComponent endpoint={endpoint} />
      </div>

    </div>
  )
}


function Header({ paths, method }) {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="flex flex-column space-x-4 mb-1">
            {method ? (<span
              className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded ${method}-color ${method}-bg-color`}
            >
              {method}
            </span>) : (<span
              className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded dark:text-slate-300 dark:bg-slate-500`}
            >
              PATH
            </span>)}
            {paths.map((path, index) => {
              // Create the path for the Link up to the current breadcrumb
              let toPath = `inventory/${paths.slice(0, index + 1).join('/')}`;
              if (index == 0) toPath = toPath + "/"
              return (
                <React.Fragment key={index}>
                  <h2
                    style={index === paths.length - 1 ? { color: "#2B84EC" } : {}}
                    className={`font-regular text-slate-800 text-md dark:text-slate-${index === 0 ? "100" : "400"} ${index !== paths.length - 1 ? "underline cursor-pointer" : ""}`}
                  >
                    <Link to={toPath}>
                      {path}
                    </Link>
                  </h2>
                  {index < paths.length - 1 && <span className="text-slate-800 dark:text-slate-400 mx-2">/</span>}
                </React.Fragment>
              );
            })}
          </div>
          <div className="overflow-x-auto secondaryDark rounded-md mt-2 py-1 px-2 flex flex-col">
            <h2 className="font-light text-slate-800 dark:text-slate-100 text-xs">Overview of key information about the active endpoints in your inventoryue.</h2>
          </div>
        </div>
        <div className="space-x-2.5 flex justify-center">
          <button className="btn hover:bg-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M9.99983 1C12.3357 3.06658 15.3843 4.14257 18.4998 4C18.9534 5.54302 19.0922 7.16147 18.908 8.75918C18.7237 10.3569 18.2202 11.9013 17.4272 13.3005C16.6343 14.6998 15.5682 15.9254 14.2923 16.9045C13.0164 17.8836 11.5566 18.5962 9.99983 19C8.44305 18.5962 6.98331 17.8836 5.70738 16.9045C4.43144 15.9254 3.36534 14.6998 2.57243 13.3005C1.77952 11.9013 1.27597 10.3569 1.09171 8.75918C0.907451 7.16147 1.04624 5.54302 1.49983 4C4.61536 4.14257 7.664 3.06658 9.99983 1Z" stroke={'#FFFFFF50'} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L10 9L18 12" stroke={'#FFFFFF50'} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden xs:block ml-2">View Threats</span>
          </button>
          <button className="btn hover:bg-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 22" fill="none">
              <path d="M17.875 5.22983C18.2187 5.46529 18.5041 5.7488 18.7018 6.09119C18.8995 6.43357 19.0025 6.82246 19 7.21783V14.5018C19 15.3108 18.557 16.0568 17.842 16.4498L11.092 20.7198C10.7574 20.9036 10.3818 20.9999 10 20.9999C9.61824 20.9999 9.24224 20.9036 8.908 20.7198L2.158 16.4498C1.80817 16.2587 1.51612 15.977 1.31241 15.6343C1.1087 15.2916 1.0008 14.9005 1 14.5018V7.21683C1 6.40783 1.443 5.66283 2.158 5.22983L8.908 1.28983C9.25254 1.09987 9.63956 1.00024 10.033 1.00024C10.4224 1.00024 10.8135 1.09987 11.158 1.28983L17.908 5.22983H17.875Z" stroke="white" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.5 8.42174C13.812 8.60174 14.003 8.93674 14 9.29774V12.5747C14 12.9387 13.803 13.2747 13.485 13.4517L10.485 15.3737C10.3366 15.456 10.1697 15.4992 10 15.4992C9.83031 15.4992 9.6634 15.456 9.515 15.3737L6.515 13.4517C6.35872 13.3651 6.22851 13.2381 6.13794 13.084C6.04737 12.93 5.99974 12.7545 6 12.5757V9.29774C6 8.93374 6.197 8.59774 6.514 8.42074L9.514 6.63074C9.825 6.45674 10.204 6.45674 10.514 6.63074L13.514 8.42074H13.5V8.42174Z" stroke="#2B84EC" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden xs:block ml-2">Build Endpoint</span>
          </button>
        </div>
      </div>
    </header >
  )
}
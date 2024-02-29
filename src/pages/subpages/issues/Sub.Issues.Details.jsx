import React, { useState } from "react";
import Details from "./partials/Partials.Issues.Details";
import VerticalTimeline from "./Sub.Issues.Report.Details";

function IssueReportDetails() {
  return (
    <div className=" w-full" style={{ minHeight: "500px" }}>
      <div className="col-span-full mainDark shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
        <Header />
        <div>
          {/* Table */}
          <div className="overflow-x-auto secondaryDark rounded-xl m-2 p-2 flex flex-col">
            <div className="mainDark rounded-lg m-2 p-4 space-y-4 detailsActionContainer">
              <Details />
            </div>
            <div className="overflow-x-auto flex  w-full my-10 pr-10">
              <VerticalTimeline />
            </div>
            {/*<div className="mainDark rounded-lg m-2 p-4 space-y-4 detailsActionContainer">
                                <History />
                            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueReportDetails;

function Header({}) {
  return (
    <header className="px-4 pt-4">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="flex  space-x-4 mb-1">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded DELETE-color DELETE-bg-color`}
            >
              Issue
            </span>
            <span className={"ml-2 dark:text-slate-100"}>SAPI-0010</span>
            <span className={"ml-2"}>api.platform.io/api/fetchData</span>
          </div>
          <div className="secondaryDark rounded-md mt-2 py-1 px-2 inline-block">
            <h2 className="font-light text-slate-800 dark:text-slate-100 text-xs">
              API rate limit exceeded without throttling
            </h2>
          </div>
        </div>
        <div className="gap-2 flex justify-center">
          <button
            onClick={() => {}}
            className={
              true
                ? "btn bg-indigo-500 hover:bg-indigo-600 text-white"
                : "btn hover:bg-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 text-white"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13 11H15M9 8H15M11 5H15M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3Z"
                stroke="white"
                strokeOpacity="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden xs:block ml-2">Resolve Issue</span>
          </button>
        </div>
      </div>
    </header>
  );
}

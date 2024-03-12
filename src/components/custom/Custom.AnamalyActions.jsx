import React from "react";
import { Link } from "react-router-dom";

function AnamalyActions({ issueActions }) {
  const getIcon = (type) => {
    switch (type) {
      case "Detected":
        return (
          <svg
            className="w-9 h-9 fill-current text-rose-50"
            viewBox="0 0 36 36"
          >
            <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
          </svg>
        );
      case "Resolved":
        return (
          <svg
            className="w-9 h-9 fill-current text-emerald-50"
            viewBox="0 0 36 36"
          >
            <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
          </svg>
        );
      case "Discarded":
        return (
          <svg
            className="w-9 h-9 fill-current text-slate-400"
            viewBox="0 0 36 36"
          >
            <path d="M21.477 22.89l-8.368-8.367a6 6 0 008.367 8.367zm1.414-1.413a6 6 0 00-8.367-8.367l8.367 8.367zM18 26a8 8 0 110-16 8 8 0 010 16z" />
          </svg>
        );
      default:
        return null;
    }
  };

  issueActions.map((issue) => {
    return (
      <li className="flex px-2">
        <div className="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
          {getIcon(issue.type)}
        </div>
        <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
          <div className="grow flex justify-between">
            <div className="self-center">
              <a
                className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                href="#0"
              >
                {issue.type}
              </a>{" "}
              <Link className={"underline"} to={issue.issueId}>
                {issue.issueId}
              </Link>{" "}
              - {issue.desc} {issue.issueSlug}
            </div>
            <div className="shrink-0 self-start ml-2">
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {issue.ts}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="col-span-full xl:col-span-6">
      <header className="px-5 py-4 ">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Anamaly Actions
        </h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <ul className="my-1">
            {issueActions.map((issue) => {
              return (
                <li className="flex px-2">
                  <div className="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
                    {getIcon(issue.type)}
                  </div>
                  <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                    <div className="grow flex justify-between">
                      <div className="self-center">
                        <a
                          className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                          href="#0"
                        >
                          {issue.type}
                        </a>{" "}
                        <Link className={"underline"} to={issue.issueId}>
                          {issue.issueId}
                        </Link>{" "}
                        - {issue.desc} {issue.slug}
                      </div>
                      <div className="shrink-0 self-start ml-2">
                        <span className="font-medium text-slate-800 dark:text-slate-100">
                          {issue.ts}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnamalyActions;

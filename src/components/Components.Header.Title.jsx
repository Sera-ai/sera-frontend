import React, { useState, useEffect, useContext } from "react";
import DropdownFilter from "./Components.DropdownFilter";
import { ExpandButton } from "./standard/Standard.Expand";

function Header({
  title = null,
  subtitle = null,
  filter = null,
  setFilter = null,
  setColumns = null,
  existingColumns = [],
  columns = [],
  subBar = false,
  children,
  tier = 2,
}) {
  return (
    <div className="col-span-full border-slate-200 dark:border-slate-700 h-full w-full flex flex-col flex-1 overflow-hidden">
      {title && (
        <header className="px-4 flex justify-between items-center shadow-xl min-h-[56px]">
          <div className="">
            <div className={" dark:text-slate-100 text-sm"}>{title}</div>
            <div className={"text-xs"}>{subtitle}</div>
          </div>
          <div className="flex flex-row space-x-4">
            {setFilter && (
              <div className="space-x-2.5 flex justify-center">
                <form className="border-b border-slate-200 dark:border-slate-700">
                  <div className="relative">
                    <input
                      className="w-full text-sm px-1 dark:text-slate-300 secondaryDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none"
                      type="search"
                      placeholder="Filter Inventory Items"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                </form>
                <DropdownFilter
                  setColumns={setColumns}
                  existingColumns={existingColumns}
                  columns={columns}
                  align={true}
                />
              </div>
            )}
            <ExpandButton tier={tier} />
          </div>
        </header>
      )}
      <div
        className={`flex flex-col flex-grow overflow-hidden w-full ${
          subBar ? "" : "mainDark"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Header;

import React, { useState, useEffect, useContext } from "react";
import DropdownFilter from "../Components.DropdownFilter";
import { ExpandButton } from "../standard/Standard.Expand";

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
  buttons = null,
  tier = 2,
  horizontal = false,
}) {
  return (
    <div className="col-span-full border-slate-200 dark:border-slate-700 h-full w-full flex flex-col flex-1 overflow-hidden">
      {title && (
        <header className="px-4 flex justify-between items-center shadow-xl min-h-[56px] secondaryDark">
          <div className="">
            <div className={" dark:text-slate-100 text-sm"}>{title}</div>
            <div className={"text-xs"}>{subtitle}</div>
          </div>
          <div className="flex flex-row space-x-4">
            {setFilter && (
              <div className="gap-2 flex justify-center">
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
            {buttons}
            <ExpandButton tier={tier} />
          </div>
        </header>
      )}
      <div
        className={`flex flex-${horizontal ? "row space-x-1" : "col"} flex-grow overflow-hidden w-full ${
          subBar ? "" : "mainDark"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Header;

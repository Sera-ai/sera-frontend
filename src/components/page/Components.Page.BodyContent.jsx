import React, { useState } from "react";
import HeaderTabs from "../Components.Header.Tabs";

function BodyContent({ selectedTab, setSelectedTab, tabs, children }) {
  return (
    <div
      className={
        "maincontent relative flex flex-col flex-1 overflow-hidden w-full secondaryDark h-full"
      }
    >
      <HeaderTabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="flex-grow overflow-y-hidden col-span-full border-slate-200 dark:border-slate-700 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default BodyContent;

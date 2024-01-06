import React, { useContext, useState } from "react";
import HeaderTabs from "../Components.Header.Tabs";
import { AppContext } from "../../provider/Provider.State";

function BodyContent({
  selectedTab,
  setSelectedTab,
  tabs,
  children,
  mainDark = false,
  tier = 1,
}) {
  const { nestedVisible } = useContext(AppContext);
  return (
    <div
      className={
        "maincontent relative flex flex-col flex-1 overflow-hidden w-full secondaryDark h-full"
      }
    >
      {nestedVisible <= tier && (
        <HeaderTabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tier={tier}
        />
      )}
      <div
        className={`flex-grow overflow-y-hidden col-span-full border-slate-200 dark:border-slate-700 w-full h-full ${
          mainDark && "mainDark"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default BodyContent;

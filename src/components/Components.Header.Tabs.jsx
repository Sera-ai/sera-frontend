import React, { useState } from "react";
import { ExpandButton } from "./standard/Standard.Expand";

const HeaderTabs = ({
  tabs,
  selectedTab,
  setSelectedTab,
  subBar = false,
  tier,
}) => {
  return (
    <div className={`text-white flex full-w tabHeader text-sm`}>
      {/* Tab: All Coins */}
      {tabs.map((tab, int) => (
        <div
          className={`cursor-pointer py-4 px-2 mx-2 ${
            selectedTab === int ? "tabHeaderSelect" : "tabHeaderNoSelect"
          }`}
          onClick={() => setSelectedTab(int)}
        >
          <span>{tab}</span>
        </div>
      ))}
      <div className="flex flex-grow justify-end items-center pr-4">
        <ExpandButton tier={tier} />
      </div>
    </div>
  );
};

export default HeaderTabs;

import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import { ListSidebar } from "../../../components/custom/Custom.ListSidebar";
import SeaMap from "@sea/App";

function EditorVisual({ oas, setOas, tier = 1 }) {
  const { inventoryInventory, nestedVisible } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [selectedHost, setSelectedHost] = useState(""); // default selected tab
  const [leftbarVisible, setLeftbar] = useState(false); // default selected tab
  const [rightbarVisible, setRightbar] = useState(true); // default selected tab
  const [tabs, setTabs] = useState(["Inventory"]);

  const LeftButton = () => (
    <SeraButton
      icon={<LeftIcon />}
      isSelected={leftbarVisible}
      onPress={setLeftbar}
    />
  );
  const RightButton = () => (
    <SeraButton
      icon={<LeftIcon flip />}
      isSelected={rightbarVisible}
      onPress={setRightbar}
    />
  );

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
      buttons={
        <div className="flex pr-2 gap-2">
          <LeftButton />
          <RightButton />
        </div>
      }
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        {nestedVisible <= tier && (
          <ListSidebar
            inventory={inventoryInventory[0]}
            selectedHost={selectedHost}
            setSelectedHost={setSelectedHost}
          />
        )}
        <SeaMap leftBar={leftbarVisible} rightBar={rightbarVisible} oas={oas} />
      </div>
    </BodyContent>
  );
}

export default EditorVisual;

export const SeraButton = ({ icon, isSelected, onPress }) => {
  return (
    <div
      className={`cursor-pointer sidebarItem flex items-center justify-center sidebarButton${
        !isSelected ? "Select" : ""
      } h-[36px] w-[36px]`}
      onClick={() => {
        onPress(!isSelected);
      }}
    >
      {icon}
    </div>
  );
};

const LeftIcon = ({ flip = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    transform={flip ? "scale(-1 1)" : null}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4.66663 7.99733H14M8.66663 12L4.66663 8L8.66663 4M1.66663 12V4"
      stroke="white"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

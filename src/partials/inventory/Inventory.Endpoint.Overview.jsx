import React, { useState } from "react";
import InventoryDetailsData from "../../pages/subpages/inventory/Sub.Inventory.DetailsData";
import { Link, useLocation } from "react-router-dom";
import BodyContent from "../../components/page/Components.Page.BodyContent";
import InventoryHostSettings from "./Inventory.Settings";

function EndpointOverview({ endpoint }) {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const tabs = ["Overview", "Settings"];
  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return <InventoryDetailsData endpoint={endpoint} />;
      case 1:
        return <InventoryHostSettings endpoint={endpoint} />;
    }
  };

  return (
    <div className="col-span-full mainDark h-full overflow-y-auto w-full">
      <BodyContent
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
        mainDark
        tier={2}
      >
        <div className="overflow-x-auto flex flex-col w-full flex-grow p-2">
          <SelectedPage />
        </div>
      </BodyContent>
    </div>
  );
}

export default EndpointOverview;


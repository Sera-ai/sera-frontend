import React, { useState } from "react";
import Inventory from "./Sub.Events.Inventory";
import Workbook from "./Sub.Events.Workbook";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function EventsEntry() {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState(["Events", "Workbooks"]);

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return <Inventory />;
      case 1:
        return <Workbook />;
    }
  };

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
    >
      <SelectedPage />
    </BodyContent>
  );
}

export default EventsEntry;

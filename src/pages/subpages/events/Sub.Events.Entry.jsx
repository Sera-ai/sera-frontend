import React, { useState } from "react";
import Inventory from "./Sub.Events.Inventory";
import Report from "./Sub.Events.Report";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function EventsEntry() {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState(["Events", "Report"]);

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return <Inventory />;
      case 1:
        return <Report />;
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

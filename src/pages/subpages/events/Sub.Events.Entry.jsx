import React, { useState } from "react";
import Inventory from "./Sub.Events.Inventory";
import Playbook from "./Sub.Events.Playbook";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function EventsEntry() {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState(["Events", "Playbooks"]);

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return <Inventory />;
      case 1:
        return <Playbook />;
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

import React, { useState } from "react";
import BuilderInventory from "./Sub.Builder.Inventory";
import BuilderIntegrations from "./Sub.Builder.Integration";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function BuilderEntry() {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState(["Endpoints",  "Integrations"]);

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return <BuilderInventory />;
      case 1:
        return <BuilderIntegrations />;
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

export default BuilderEntry;

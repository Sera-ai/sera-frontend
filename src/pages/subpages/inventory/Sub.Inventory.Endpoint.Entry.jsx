import React, { useState, useContext, useEffect } from "react";

import Analytics from "../../../partials/inventory/Inventory.Analytics";
import Documentation from "../../../partials/inventory/Inventory.Documentation";
import InventorySidebar from "../../../partials/inventory/Inventory.Sidebar";
import { useNavigate } from "react-router-dom";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function Entry({ oas, setOas }) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(1); // default selected tab
  const [subSelectedTab, setSubSelectedTab] = useState(0); // default selected tab
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tabs, setTabs] = useState(["Inventory", "api.sample.com"]);

  useEffect(() => {
    if (selectedTab === 0) {
      navigate("inventory");
    }
  }, [selectedTab]); // Dependency array includes selectedTab

  const SelectedPage = () => {
    switch (subSelectedTab) {
      case 0:
        return <Analytics oas={oas} setOas={setOas} />;
      case 1:
        return <Documentation oas={oas} setOas={setOas} />;
    }
  };

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
    >
      <div className="flex w-full h-full ">
        <InventorySidebar
          oas={oas}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="col-span-full border-slate-200 dark:border-slate-700 w-full h-full pt-[17px]">
          <BodyContent
            selectedTab={subSelectedTab}
            setSelectedTab={setSubSelectedTab}
            tabs={["Analytics", "Documentation"]}
          >
            <SelectedPage />
          </BodyContent>
        </div>
      </div>
    </BodyContent>
  );
}

export default Entry;

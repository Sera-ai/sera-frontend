import React, { useState, useContext } from "react";
import HeaderTabs from "../../../components/Components.Header.Tabs";
import InventoryFullList from "../../../components/Components.InventoryFullList";
import InventorySidebar from "../../../partials/inventory/Inventory.Sidebar";
import Header from "../../../components/Components.Header.Title";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function InventoryEntry({ oas }) {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const [tabs, setTabs] = useState(["Inventory"]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { issueInventory } = useContext(AppContext);



  const existingColumns =
    issueInventory.length > 0 ? Object.keys(issueInventory[0]) : [];

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
    >
      <Header
        title={"Endpoint Inventory"}
        subtitle={"Below is an inventory list of all managed endpoints"}
        filter={filter}
        setFilter={setFilter}
        setColumns={setColumns}
        existingColumns={existingColumns}
        columns={columns}
      >
        <InventoryFullList
          filter={filter}
          setFilter={setFilter}
          columns={columns}
          data={issueInventory}
        />
      </Header>
      <InventorySidebar
        oas={oas}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </BodyContent>
  );
}

export default InventoryEntry;

import React, { useState, useRef, useContext } from "react";

import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/custom/Custom.Header.Title";
import Table from "../../../components/standard/Standard.Table";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import InventoryHostSettings from "../inventory/partials/Partials.Inventory.Settings";

function Builders() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const { builderInventory } = useContext(AppContext);

  const existingColumns =
    builderInventory.length > 0 ? Object.keys(builderInventory[0][0]) : [];

  console.log(existingColumns);
  console.log(builderInventory[0]);

  const [selectedItems, setSelectedItems] = useState({});
  const selectAllRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState(["Builders", "Settings"]);

  const linkClasses = ["builder"];

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return (
          <Table
            padded={true}
            raw={true}
            allowSelect={false}
            filter={filter}
            setFilter={setFilter}
            columns={columns}
            data={builderInventory[0]}
            linkClasses={linkClasses}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectAllRef={selectAllRef}
          />
        );
      case 1:
        return <InventoryHostSettings mainDark />;
    }
  };

  return (
    <Header
      title={"Builder Endpoints"}
      subtitle={
        "Below is an inventory list of any events that have not been resolved"
      }
      filter={filter}
      setFilter={setFilter}
      setColumns={setColumns}
      existingColumns={existingColumns}
      columns={columns}
      horizontal={true}
      tier={2}
    >
      <ContentBar
        showHost
        endpoint="inventory/api.sample.com/pets/__post"
        host={"http://sample.com"}
        selectedEndpoint={"selectedEndpoint"}
        showBlock={false}
        setSelectedEndpoint={() => {}}
      />
      <div className="flex pt-1 w-full h-full">
        <BodyContent
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          mainDark
          tabs={tabs}
        >
          <SelectedPage />
        </BodyContent>
      </div>
    </Header>
  );
}

export default Builders;

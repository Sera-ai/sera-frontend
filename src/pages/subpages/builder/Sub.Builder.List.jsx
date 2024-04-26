import React, { useState, useRef, useContext, useEffect } from "react";

import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/custom/Custom.Header.Title";
import Table from "../../../components/standard/Standard.Table";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import InventoryHostSettings from "../inventory/partials/Partials.Inventory.Settings";
import { useNavigate } from "react-router-dom";

function Builders() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const [builderInventory, setBuilderInventory] = useState([]);
  const { loadStateData } = useContext(AppContext);

  useEffect(() => {
    const getBuilderInventory = async () => {
      const builderInventory = await loadStateData({
        key: "getBuilderInventory",
      });
      const inventoryArray = [];
      builderInventory.map((inv) => {
        console.log(inv)
        if (inv.host_id && inv.builder_id) {
          inventoryArray.push({
            host: inv.host_id.hostname,
            path: inv.endpoint,
            method: inv.method,

            builder: `[/builder/${inv.host_id.hostname}${inv.endpoint}](/builder/${inv.host_id.hostname}${inv.endpoint}/${inv.method.toLowerCase()})`,
            builderEnabled: inv.builder_id.enabled,
          });
        }
      });
      console.log(inventoryArray);

      setBuilderInventory(inventoryArray);
    };
    getBuilderInventory();
  }, []);

  const existingColumns = [];
  // builderInventory.length > 0 ? Object.keys(builderInventory[0]) : [];

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
            data={builderInventory}
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

  const navigate = useNavigate();

  const navigateBuilder = (data) => {
    const newUrl = `/builder/${data
      .replace("__", "")
      .replace("https://", "")
      .replace("http://", "")}`;

    console.log(data);

    navigate(newUrl);
  };

  return (
    <Header
      title={"Builder Endpoints"}
      subtitle={
        "Below is an inventory list of any events that have not been resolved"
      }
      filter={filter}
      setFilter={selectedTab == 0 ? setFilter : null}
      setColumns={setColumns}
      existingColumns={existingColumns}
      columns={columns}
      horizontal={true}
      tier={2}
    >
      <div className="flex pt-1 w-full h-full space-x-1">
        <ContentBar
          builder
          showHost
          endpoint="inventory/api.sample.com/pets/__post"
          host={"http://sample.com"}
          selectedEndpoint={"selectedEndpoint"}
          showBlock={false}
          setSelectedEndpoint={navigateBuilder}
        />
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

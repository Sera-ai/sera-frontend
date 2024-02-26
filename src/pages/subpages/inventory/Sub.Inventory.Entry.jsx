import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import { ListSidebar } from "../../../components/custom/Custom.ListSidebar";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import ApiDetails from "./partials/Partials.Inventory.Analytics";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryOverview from "./partials/Partials.Inventory.Overview";
import EndpointOverview from "./partials/Partials.Inventory.Endpoint.Overview";

function InventoryEntry({ oas, tier = 1 }) {
  const { inventoryInventory, nestedVisible } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [selectedHost, setSelectedHost] = useState(""); // default selected tab
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [tabs, setTabs] = useState(["Inventory"]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    const paths = pathname
      .split("/")
      .filter(segment => segment.trim() !== ""); // Add this line


    paths.shift(); //remove inventory

    if (paths.length > 0) {
      setSelectedHost(paths[0]);
      if (paths.length > 1) {
        paths.shift();
        console.log("hmm", paths.join("/"))
        setSelectedEndpoint(paths.join("/"));
      } else {
        setSelectedEndpoint("");
      }
    } else {
      setSelectedHost("");
    }
  }, [location]);

  useEffect(() => {
    if (selectedHost || selectedEndpoint) {
      console.log(selectedEndpoint)
      const newUrl = (`/inventory/${(selectedHost)}/${selectedEndpoint}`)

      console.log(newUrl)

      navigate(newUrl, { replace: true });
    }
  }, [selectedEndpoint]);

  /*useEffect(() => {
    setSelectedEndpoint("");
  }, [selectedHost]);*/

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        {nestedVisible <= tier && (
          <ListSidebar
            inventory={inventoryInventory}
            selectedHost={selectedHost}
            setSelectedHost={setSelectedHost}
          />
        )}
        {selectedHost && nestedVisible <= tier && (
          <ContentBar
            endpoint="inventory/api.sample.com/pets/__post"
            host={selectedHost}
            selectedEndpoint={selectedEndpoint}
            setSelectedEndpoint={setSelectedEndpoint}
          />
        )}
        {!selectedHost && (
          <InventoryOverview endpoint="inventory/api.sample.com/pets/__post" />
        )}
        {selectedHost && !selectedEndpoint && (
          <EndpointOverview endpoint="inventory/api.sample.com/pets/__post" />
        )}
        {selectedHost && selectedEndpoint && (
          <ApiDetails endpoint="inventory/api.sample.com/pets/__post" />
        )}
      </div>
    </BodyContent>
  );
}

export default InventoryEntry;

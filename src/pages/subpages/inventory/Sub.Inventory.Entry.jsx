import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import { ListSidebar } from "../../../components/custom/Custom.ListSidebar";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import ApiDetails from "./partials/Partials.Inventory.Analytics";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryOverview from "./partials/Partials.Inventory.Overview";
import EndpointOverview from "./partials/Partials.Inventory.Endpoint.Overview";
import ApiDocumentation from "./partials/Partials.Inventory.Documentation";
import InventoryHostOverview from "./partials/Partials.Inventory.Host.Overview";
import InventoryDetailsData from "./Sub.Inventory.DetailsData";

function InventoryEntry({ tier = 1 }) {
  const { inventoryInventory, nestedVisible, dummyOas, loadStateData } =
    useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [selectedHost, setSelectedHost] = useState(""); // default selected tab
  const [selectedHostData, setSelectedHostData] = useState({}); // default selected tab
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [hostDns, setDns] = useState(null);
  const [isAnalytics, setAnalytics] = useState(false);
  const [tabs, setTabs] = useState(["Inventory"]);

  const [oas, setOas] = useState(dummyOas[0]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    const paths = pathname
      .split("/")
      .filter((segment) => segment.trim() !== ""); // Add this line

    paths.shift(); //remove inventory

    if (paths.length > 0) {
      setSelectedHost(paths[0]);
      if (paths.length > 1) {
        paths.shift();
        setSelectedEndpoint(paths.join("/"));
      } else {
        setSelectedEndpoint("");
      }
    } else {
      setSelectedHost("");
    }
  }, [location]);

  useEffect(() => {
    if (selectedHost) {
      const grabOas = async () => {
        try {
          console.log("set selected host", selectedHost);
          const newUrl = `/inventory/${selectedHost}`;

          const hostOas = await loadStateData({
            key: "getOasFromHost",
            params: { hostname: selectedHost },
          });

          const hostDns = await loadStateData({
            key: "getDnsFromHost",
            params: { hostname: selectedHost },
          });

          const hostData = inventoryInventory[0].filter(
            (host) => host.hostname === selectedHost
          );

          console.log(inventoryInventory[0]);
          console.log(hostData);
          setOas(hostOas);
          setDns(hostDns);
          setSelectedHostData(hostData[0]);
          setSelectedEndpoint("");
          console.log(newUrl);

          navigate(newUrl, { replace: true });
        } catch (e) {
          console.warn(e);
        }
      };
      grabOas();
    }
  }, [selectedHost]);

  useEffect(() => {
    if (selectedHost && selectedEndpoint) {
      console.log("set selected endpoint", selectedEndpoint);
      const newUrl = `/inventory/${selectedHost}/${selectedEndpoint}`;

      console.log(newUrl);

      navigate(newUrl, { replace: true });
    }
  }, [selectedEndpoint]);

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        {/* Hosts List Bar */}
        {nestedVisible <= tier && (
          <ListSidebar
            inventory={inventoryInventory[0]}
            selectedHost={selectedHost}
            setSelectedHost={setSelectedHost}
            setSelectedHostData={setSelectedHostData}
          />
        )}

        {/* Endpoints List Bar */}
        {selectedHost && nestedVisible <= tier && (
          <ContentBar
            endpoint="inventory/api.sample.com/pets/__post"
            host={selectedHost}
            selectedEndpoint={selectedEndpoint}
            setSelectedEndpoint={setSelectedEndpoint}
          />
        )}

        {selectedHost ? (
          <InventoryHostOverview
            selectedHostData={selectedHostData}
            setSelectedEndpoint={setSelectedEndpoint}
            selectedEndpoint={selectedEndpoint}
            hostDns={hostDns}
            selectedHost={selectedHost}
            oas={oas}
            endpoint={selectedEndpoint.replace("%7B", "{").replace("%7D", "}")}
            setOas={setOas}
          />
        ) : (
          <InventoryDetailsData endpoint="inventory/api.sample.com/pets/__post" />
        )}
      </div>
    </BodyContent>
  );
}

export default InventoryEntry;

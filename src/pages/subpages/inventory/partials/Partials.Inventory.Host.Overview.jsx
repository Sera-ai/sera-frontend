import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BodyContent from "../../../../components/page/Components.Page.BodyContent";
import InventoryHostSettings from "./Partials.Inventory.Settings";
import CatalogDetailsData from "./Partials.Inventory.EndpointDetails";

import ApiDocumentation from "./Partials.Inventory.Documentation";
import EndpointManager from "./Partials.Inventory.EndpointManager";
import { getAnalytics } from "../../../../provider/Provider.Data";

const InventoryHostOverview = ({
  tier = 2,
  selectedHostData,
  setSelectedEndpoint,
  setPeriodSelection,
  periodSelection,
  endpoint,
  hostDns,
  oas,
  setOas,
}) => {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState([
    "Analytics",
    "Documentation",
    "Route Manager",
    "Settings",
  ]);

  const [editDocs, setEditDocs] = useState(false);
  const [method, setMethod] = useState("");
  const [manageOAS, setManageOAS] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const [endpointSankeyChart, setEndpointSankeyChart] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  const paths = decodeURIComponent(pathname).split("/");
  paths.shift(); //remove blank
  paths.shift(); //remove inventory

  useEffect(() => {
    async function getAnalyticsData() {
      setEndpointSankeyChart(null)
      try {

        const { pathname } = location;
        const paths2 = decodeURIComponent(pathname).split("/");
        paths2.shift(); //remove blank
        paths2.shift(); //remove inventory

        if (paths2[0] != "" && paths2[0] != undefined) {
          console.log(paths2[0]);
          const searchResult = await getAnalytics({
            period: periodSelection,
            host: paths2[0],
          });
          console.log(searchResult);
          if (searchResult) {
            if (searchResult.endpointSankeyChart?.nodes.length > 0)
              setEndpointSankeyChart(searchResult.endpointSankeyChart);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"];
    if (matchMethod.includes(paths[paths.length - 1])) {
      setMethod(paths.pop().replace("__", "").toUpperCase());
    }

    getAnalyticsData();
  }, [periodSelection, location]);

  const oasEditorRef = useRef();
  const MDEditorRef = useRef();

  const updateChildState = () => {
    oasEditorRef.current.settingState();
  };

  const updateMarkdown = () => {
    MDEditorRef.current.saveOasItem();
  };

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return (
          <CatalogDetailsData
            endpoint="inventory/api.sample.com/pets/__post"
            setPeriodSelection={setPeriodSelection}
            periodSelection={periodSelection}
            endpointSankeyChart={endpointSankeyChart}
          />
        );
      case 1:
        return (
          <ApiDocumentation
            oas={oas}
            setOas={setOas}
            setSelectedEndpoint={setSelectedEndpoint}
            method={method}
            host={selectedHostData}
            endpoint={endpoint}
            setEditDocs={setEditDocs}
            editDocs={editDocs}
            manageOAS={manageOAS}
            setManageOAS={setManageOAS}
            isError={isError}
            setIsError={setIsError}
            updateMarkdown={updateMarkdown}
            updateChildState={updateChildState}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
        );
      case 2:
        return (
          <EndpointManager
            endpoint={endpoint}
            hostDns={hostDns}
            selectedHostData={selectedHostData}
          />
        );
      case 3:
        return <InventoryHostSettings selectedHostData={selectedHostData} />;
    }
  };

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
      mainDark
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        <SelectedPage />
      </div>
    </BodyContent>
  );
};

export default InventoryHostOverview;

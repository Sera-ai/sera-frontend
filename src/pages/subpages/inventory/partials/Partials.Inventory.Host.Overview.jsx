import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BodyContent from "../../../../components/page/Components.Page.BodyContent";
import InventoryHostSettings from "./Partials.Inventory.Settings";
import CatalogDetailsData from "./Partials.Inventory.EndpointDetails";

import ApiDocumentation from "./Partials.Inventory.Documentation";
import EndpointManager from "./Partials.Inventory.EndpointManager";

const InventoryHostOverview = ({
  tier = 2,
  selectedHostData,
  setSelectedEndpoint,
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

  const location = useLocation();
  const { pathname } = location;
  const paths = decodeURIComponent(pathname).split("/");
  paths.shift(); //remove blank
  paths.shift(); //remove inventory
  useEffect(() => {
    const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"];
    if (matchMethod.includes(paths[paths.length - 1])) {
      setMethod(paths.pop().replace("__", "").toUpperCase());
    }
  }, [location]);

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
          <CatalogDetailsData endpoint="inventory/api.sample.com/pets/__post" />
        );
      case 1:
        return (
          <ApiDocumentation
            oas={oas}
            setOas={setOas}
            setSelectedEndpoint={setSelectedEndpoint}
            method={method}
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

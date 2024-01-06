import React, { useState } from "react";
import InventoryDetailsData from "../../pages/subpages/inventory/Sub.Inventory.DetailsData";
import AnamalyList from "../../components/Components.AnamalyList";
import ProxySettings from "../../components/Components.ProxySettings";
import PluginComponent from "../../components/Components.PluginComponent";
import { Link, useLocation } from "react-router-dom";

function InventoryOverview({ endpoint }) {
  

  return (
    <div className="col-span-full mainDark p-2 h-full overflow-y-auto w-full px-4">
      <div className="overflow-x-auto flex flex-col w-full flex-grow">
        <InventoryDetailsData endpoint={endpoint} />
      </div>
    </div>
  );
}

export default InventoryOverview;

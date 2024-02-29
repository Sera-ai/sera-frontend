import React, { useState } from "react";
import InventoryDetailsData from "../Sub.Inventory.DetailsData";
import AnamalyList from "../../../../components/custom/Custom.AnamalyList";
import ProxySettings from "../../../../components/custom/Custom.ProxySettings";
import PluginComponent from "../../../../components/custom/Custom.PluginComponent";
import { Link, useLocation } from "react-router-dom";

function InventoryOverview({ endpoint }) {
  

  return (
    <div className="col-span-full mainDark p-2 h-full overflow-y-auto w-full px-4">
      <div className="overflow-x-auto flex flex-col w-full flex-grow">
        <InventoryDetailsData endpoint={endpoint} overview={true} />
      </div>
    </div>
  );
}

export default InventoryOverview;

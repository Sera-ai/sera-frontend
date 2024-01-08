import React, { useState } from "react";
import InventoryDetailsData from "../Sub.Inventory.DetailsData";

function ApiDetails({ endpoint }) {
  

  return (
    <div className="col-span-full mainDark p-2 h-full overflow-y-auto w-full px-4">
      <div className="overflow-x-auto flex flex-col w-full flex-grow">
        <InventoryDetailsData endpoint={endpoint} />
      </div>
    </div>
  );
}

export default ApiDetails;
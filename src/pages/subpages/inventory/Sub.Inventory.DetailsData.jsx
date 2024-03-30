import React, { useState, useContext } from "react";
import BarGraph from "../../../components/custom/Custom.MonthlyAnalytics";
import { AppContext } from "../../../provider/Provider.State";
import CardUptime from "../../../components/cards/Components.Card.Uptime";
import CardTraffic from "../../../components/cards/Components.Card.Traffic";
import CardLatency from "../../../components/cards/Components.Card.Latency";
import CardStacked from "../../../components/cards/Components.Card.Stacked";
import CardDetails from "../../../components/cards/Components.Card.Details";
import InventoryHeader from "../../../components/page/Components.Page.Inventory.Header";

function InventoryDetailsData({ endpoint, overview = false }) {
  const { endpointDetails, uptimeDetails } = useContext(AppContext);

  return (
      <div className="grid grid-cols-3 gap-7 w-full p-4">
        {/* <BarGraph bare={true} /> */}
        <CardUptime data={uptimeDetails[0]} />
        <CardDetails endpointDetails={endpointDetails[0]} />

        <CardUptime data={uptimeDetails[0]} />
        <CardStacked />

        <CardUptime data={uptimeDetails[0]} />
        <CardTraffic />
        {/* <BarGraph bare={false} />
          <InventoryFullList filter={""} /> */}
      </div>
  );
}

export default InventoryDetailsData;

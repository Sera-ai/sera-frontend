import React, { useState, useContext } from "react";
import BarGraph from "../../../components/custom/Custom.MonthlyAnalytics";
import { AppContext } from "../../../provider/Provider.State";
import CardUptime from "../../../components/cards/Components.Card.Uptime";
import CardTraffic from "../../../components/cards/Components.Card.Traffic";
import CardLatency from "../../../components/cards/Components.Card.Latency";
import CardStacked from "../../../components/cards/Components.Card.Stacked";
import CardDetails from "../../../components/cards/Components.Card.Details";
import InventoryHeader from "../../../components/page/Components.Page.Inventory.Header";
import Treemap from "../../../components/charts/Charts.Treemap";

function InventoryDetailsData({ endpoint, overview = false }) {
  const { endpointDetails, uptimeDetails } = useContext(AppContext);

  console.log(endpointDetails)

  return (
      <div className="grid grid-cols-3 gap-7 w-full p-4">
        {/* <BarGraph bare={true} /> */}
        <Treemap data={uptimeDetails} />
        <CardDetails endpointDetails={endpointDetails} />

        <CardUptime data={uptimeDetails} />
        <CardStacked />

        <CardUptime data={uptimeDetails} />
        <CardTraffic />
        {/* <BarGraph bare={false} />
          <InventoryFullList filter={""} /> */}
      </div>
  );
}

export default InventoryDetailsData;

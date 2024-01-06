import React, { useState, useContext } from "react";
import BarGraph from "../../../components/Components.MonthlyAnalytics";
import { AppContext } from "../../../provider/Provider.State";
import CardUptime from "../../../components/cards/Components.Card.Uptime";
import CardTraffic from "../../../components/cards/Components.Card.Traffic";
import CardLatency from "../../../components/cards/Components.Card.Latency";
import CardStacked from "../../../components/cards/Components.Card.Stacked";
import CardDetails from "../../../components/cards/Components.Card.Details";
import InventoryHeader from "../../../components/page/Components.Page.Inventory.Header";

function InventoryDetailsData({ endpoint }) {
  const { endpointDetails } = useContext(AppContext);

  if (!endpointDetails[endpoint]) {
    return;
  }

  const tableData = (data, index, total) => {
    let returnData;
    switch (typeof data) {
      case "object":
        returnData = data.map((tag) => tag).join(", ");
        break;
      case "string":
        returnData = data;
        break;
      default:
        returnData = data;
        break;
    }

    if (index == 0) {
      return (
        <span
          className={`inline-flex items-center px-1 py-0.5 text-xs text-white rounded`}
          style={
            data.toLowerCase() === "active"
              ? { backgroundColor: "#23A85830", color: "#23A858" }
              : { backgroundColor: "#EC2B2B30", color: "#EC2B2B" }
          }
        >
          {returnData}
        </span>
      );
    } else if (index == total - 1) {
      return data.map((tag, index) => (
        <React.Fragment key={index}>
          <h2
            style={{ color: "#2B84EC" }}
            className="text-xs text-slate-800 dark:text-slate-100 underline cursor-pointer"
          >
            {tag}
          </h2>
          {index !== data.length - 1 && (
            <span className="px-1 cursor-default"> , </span>
          )}
        </React.Fragment>
      ));
    } else {
      return returnData;
    }
  };

  return (
    <div className="flex flex-col">
      <InventoryHeader paths={[]} method={"GET"} />

      <div className="grid grid-cols-3 gap-7 w-full py-2">
        {/* <BarGraph bare={true} /> */}
        <CardUptime />
        <CardDetails />

        <CardUptime />
        <CardStacked />

        <CardUptime />
        <CardTraffic />
        {/* <BarGraph bare={false} />
          <InventoryFullList filter={""} /> */}
      </div>
    </div>
  );
}

export default InventoryDetailsData;

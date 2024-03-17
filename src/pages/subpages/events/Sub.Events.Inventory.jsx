import React, { useState, useRef, useContext } from "react";

import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/custom/Custom.Header.Title";
import Table from "../../../components/standard/Standard.Table";

function Inventory() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const { eventInventory } = useContext(AppContext);

  const existingColumns =
    eventInventory[0].length > 0 ? Object.keys(eventInventory[0][0]) : [];

  const [selectedItems, setSelectedItems] = useState({});
  const selectAllRef = useRef(null);

  const linkClasses = [
    "host",
    "endpoint",
    "userIp",
    "seraHost",
    "seraEndpoint",
    "builderId",
    "eventId",
  ];

  return (
    <Header
      title={"Event Inventory"}
      subtitle={
        "Below is an inventory list of any events that have not been resolved"
      }
      filter={filter}
      setFilter={setFilter}
      setColumns={setColumns}
      existingColumns={existingColumns}
      columns={columns}
      tier={2}
    >
      <Table
        filter={filter}
        setFilter={setFilter}
        columns={columns}
        data={eventInventory[0]}
        linkClasses={linkClasses}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectAllRef={selectAllRef}
      />
    </Header>
  );
}

export default Inventory;

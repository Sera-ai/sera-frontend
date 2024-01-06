import React, { useState, useRef, useContext } from "react";
import IssuesTable from "../../../partials/issues/Issues.Table";
import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/Components.Header.Title";
import Table from "../../../components/standard/Standard.Table";

function Inventory() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const { issueInventory } = useContext(AppContext);

  const existingColumns =
    issueInventory.length > 0 ? Object.keys(issueInventory[0]) : [];

  const [selectedItems, setSelectedItems] = useState({});
  const selectAllRef = useRef(null);

  const linkClasses = [
    "host",
    "endpoint",
    "userIp",
    "seraHost",
    "seraEndpoint",
    "builderId",
    "issueId",
  ];

  console.log(issueInventory);

  return (
    <Header
      title={"Issue Inventory"}
      subtitle={
        "Below is an inventory list of any issues that have not been resolved"
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
        data={issueInventory}
        linkClasses={linkClasses}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectAllRef={selectAllRef}
      />
    </Header>
  );
}

export default Inventory;

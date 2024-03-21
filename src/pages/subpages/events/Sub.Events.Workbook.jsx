import React, { useState, useRef, useContext } from "react";

import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/custom/Custom.Header.Title";
import Table from "../../../components/standard/Standard.Table";
import Timeline from "@timeline/App";

function Workbooks() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const { workbookInventory } = useContext(AppContext);

  const existingColumns =
    workbookInventory.length > 0 ? Object.keys(workbookInventory[0][0]) : [];

  console.log(existingColumns);
  console.log(workbookInventory[0]);

  const [selectedItems, setSelectedItems] = useState({});
  const selectAllRef = useRef(null);

  const linkClasses = [
    "name",
  ];

  return (
    <Header
      title={"Event Workbooks"}
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
        padded={true}
        allowSelect={false}
        filter={filter}
        setFilter={setFilter}
        columns={columns}
        data={workbookInventory[0]}
        linkClasses={linkClasses}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectAllRef={selectAllRef}
      />
    </Header>
  );
}

export default Workbooks;

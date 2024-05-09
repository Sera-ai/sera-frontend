import React, { useState, useRef, useContext } from "react";

import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/custom/Custom.Header.Title";
import Table from "../../../components/standard/Standard.Table";
import Timeline from "@timeline/App";

function Playbooks() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const { playbookInventory } = useContext(AppContext);

  const existingColumns =
    playbookInventory.length > 0 ? Object.keys(playbookInventory[0]) : [];

  console.log(existingColumns);
  console.log(playbookInventory);

  const [selectedItems, setSelectedItems] = useState({});
  const selectAllRef = useRef(null);

  const linkClasses = [
    "name",
  ];

  return (
    <Header
      title={"Event Playbooks"}
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
        data={playbookInventory}
        linkClasses={linkClasses}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectAllRef={selectAllRef}
      />
    </Header>
  );
}

export default Playbooks;

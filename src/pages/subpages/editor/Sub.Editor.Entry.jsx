import React, { useContext, useState } from "react";
import HostFullList from "../../../components/custom/Custom.HostsFullList";
import HeaderWrapper from "../../../components/custom/Custom.HeaderWrapper";
import ImportData from "./Sub.Editor.Import";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";

function EditorEntry() {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const [tabs, setTabs] = useState(["Manage", "Import"]);

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return (
          <HeaderWrapper
            filter={filter}
            setFilter={setFilter}
            setColumns={setColumns}
            columns={columns}
          >
            <HostFullList setFilter={setFilter} filter={filter} />
          </HeaderWrapper>
        );
      case 1:
        return <ImportData />;
    }
  };
  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
    >
      <SelectedPage />
    </BodyContent>
  );
}

export default EditorEntry;

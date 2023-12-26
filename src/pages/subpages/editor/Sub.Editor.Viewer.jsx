import React, { useContext, useState } from "react";
import HeaderTabs from "../../../components/Components.Header.Tabs";
import HostFullList from "../../../components/Components.HostsFullList";
import HeaderWrapper from "../../../components/Components.HeaderWrapper";
import ImportData from "./Sub.Editor.Import";
import { AppContext } from "../../../provider/Provider.State";
import EditorOasTreeView from "../../../partials/editor/Editor.OasTreeView";

function EditorViewer() {
  const [selectedTab, setSelectedTab] = useState(2); // default selected tab
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);

  const { dummyOas } = useContext(AppContext)
  const [oas, setOas] = useState(dummyOas);

  const getSelectedTab = () => {
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
      case 2:
        return (
          <HeaderWrapper
            filter={filter}
            setFilter={setFilter}
            setColumns={setColumns}
            columns={columns}
            header="https://api.example.com"
            subheader="Documentation for https://api.example.com"
          >
            <EditorOasTreeView oas={oas} filter={filter} />
          </HeaderWrapper>
        );
    }
  };
  return (
    <div
      className={
        "maincontent relative flex flex-col flex-1 overflow-hidden w-full secondaryDark h-full"
      }
    >
      <HeaderTabs
        tabs={["Manage", "Import", "https://api.example.com"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="flex w-full h-full">{getSelectedTab()}</div>
    </div>
  );
}

export default EditorViewer;

import React, { useContext, useState } from "react";
import HostFullList from "../../../components/Components.HostsFullList";
import ImportData from "./Sub.Editor.Import";
import { AppContext } from "../../../provider/Provider.State";
import EditorOasTreeView from "../../../partials/editor/Editor.OasTreeView";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import Header from "../../../components/Components.Header.Title";

function EditorViewer() {
  const [selectedTab, setSelectedTab] = useState(2); // default selected tab
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const [tabs, setTabs] = useState([
    "Manage",
    "Import",
    "https://api.example.com",
  ]);

  const { dummyOas } = useContext(AppContext);
  const [oas, setOas] = useState(dummyOas);

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return <HostFullList setFilter={setFilter} filter={filter} />;
      case 1:
        return <ImportData />;
      case 2:
        return <EditorOasTreeView oas={oas} filter={filter} />;
    }
  };
  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
    >
      <Header
        title={tabs[selectedTab]}
        subtitle={""}
        filter={filter}
        setFilter={setFilter}
        setColumns={setColumns}
        columns={columns}
      >
        <SelectedPage />
      </Header>
    </BodyContent>
  );
}

export default EditorViewer;

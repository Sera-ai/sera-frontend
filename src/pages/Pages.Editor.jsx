import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import EditorEntry from "./subpages/editor/Sub.Editor.Entry";
import EditorViewer from "./subpages/editor/Sub.Editor.Viewer";
import MainContent from "../components/page/Components.Page.MainContent";
import SeaMap from "@sea/App";

function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("Inventory");

  useEffect(() => {
    setIsPopup(window.opener != null);
  }, []);

  return (
    <MainContent
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isPopup={isPopup}
      title={title}
    >
      <Routes>
        <Route index element={<EditorEntry />} />
        <Route
          path=":host/*"
          element={<SeaMap oas={{}} setOas={() => {}} />}
        />

        {/* You can add more subroutes here if needed */}
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Editor;

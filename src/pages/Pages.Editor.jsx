import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import EditorEntry from "./subpages/editor/Sub.Editor.Entry";
import MainContent from "../components/page/Components.Page.MainContent";
import EditorVisual from "./subpages/editor/Sub.Editor.Visual";
import { AppContext } from "../provider/Provider.State";

function Editor() {
  const { dummyOas } = useContext(AppContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("Editor");

  const [oas, setOas] = useState(dummyOas[0]);

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
          element={<EditorVisual oas={oas} setOas={setOas} />}
        />

        {/* You can add more subroutes here if needed */}
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Editor;

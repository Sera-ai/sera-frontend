import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import EditorEntry from "./subpages/editor/Sub.Editor.Entry";

import BuilderMap from "@builder/App";
import MainContent from "../components/page/Components.Page.MainContent";
import InventorySidebar from "./subpages/inventory/partials/Partials.Inventory.Sidebar";

function Builder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("Builder");

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
          element={<BuilderMap InventorySidebar={InventorySidebar} />}
        />

        {/* You can add more subroutes here if needed */}
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Builder;

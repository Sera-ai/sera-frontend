import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import BuilderMap from "@builder/App";
import MainContent from "../components/page/Components.Page.MainContent";
import InventorySidebar from "./subpages/inventory/partials/Partials.Inventory.Sidebar";
import Builders from "./subpages/builder/Sub.Builder.List";

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
        <Route index element={<Builders />} />
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

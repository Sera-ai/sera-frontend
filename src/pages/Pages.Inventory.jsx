import React, { useState, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Entry from "./subpages/inventory/Sub.Inventory.Entry";
import MainContent from "../components/page/Components.Page.MainContent";

function Inventory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MainContent
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isPopup={false}
      title={"Inventory"}
    >
      <Routes>
        <Route index element={<Entry />} />
        <Route path=":host/*" element={<Entry />} />
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Inventory;

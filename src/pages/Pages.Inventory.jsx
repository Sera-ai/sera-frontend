import React, { useState, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Entry from "./subpages/inventory/Sub.Inventory.Entry";

import { AppContext } from "../provider/Provider.State";
import MainContent from "../components/page/Components.Page.MainContent";

function Inventory() {
  const { dummyOas } = useContext(AppContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [oas, setOas] = useState(dummyOas);

  return (
    <MainContent
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isPopup={false}
      title={"Inventory"}
    >
      <Routes>
        <Route index element={<Entry oas={oas} setOas={setOas} />} />
        <Route path=":host/*" element={<Entry oas={oas} setOas={setOas} />} />
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Inventory;

import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import MainContent from "../components/page/Components.Page.MainContent";
import Builders from "./subpages/builder/Sub.Builder.List";
import BuilderFlow from "./subpages/builder/Sub.Builder.Flow";

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
          element={<BuilderFlow />}
        />

        {/* You can add more subroutes here if needed */}
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Builder;

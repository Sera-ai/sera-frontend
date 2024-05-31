import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import MainContent from "../components/page/Components.Page.MainContent";

const SeraSettings = React.lazy(
  () => import("./subpages/settings/Sub.Settings.Sera")
);

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("Settings");

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
        <Route index element={<SeraSettings />} />
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Settings;

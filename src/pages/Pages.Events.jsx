import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import EventReportDetails from "./subpages/events/Sub.Events.Details";
import Viewer from "./subpages/events/Sub.Events.Viewer";
import EventsEntry from "./subpages/events/Sub.Events.Entry";
import MainContent from "../components/page/Components.Page.MainContent";
import Playbook from "./subpages/events/Sub.Events.Playbook";

function Events() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("Events");

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
        <Route index element={<EventsEntry />} />
        <Route path="viewer/:eventId" element={<Viewer />} />
        <Route path="workbook/:workbookId" element={<Playbook />} />
        <Route path=":eventId/*" element={<EventReportDetails />} />
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Events;

import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import MainContent from "../components/page/Components.Page.MainContent";

const Playbook = React.lazy(
  () => import("./subpages/events/Sub.Events.Playbook.Builder")
);
const Viewer = React.lazy(() => import("./subpages/events/Sub.Events.Viewer"));
const EventsEntry = React.lazy(
  () => import("./subpages/events/Sub.Events.Entry")
);

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
        <Route path="playbook/:playbookId" element={<Playbook />} />
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Events;

import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import IssueReportDetails from "./subpages/issues/Sub.Issues.Details";
import Viewer from "./subpages/issues/Sub.Issues.Viewer";
import IssuesEntry from "./subpages/issues/Sub.Issues.Entry";
import MainContent from "../components/page/Components.Page.MainContent";

function Issues() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("Issues");

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
        <Route index element={<IssuesEntry />} />
        <Route path="viewer/:issueId" element={<Viewer />} />
        <Route path=":issueId/*" element={<IssueReportDetails />} />
      </Routes>
      <Outlet />
    </MainContent>
  );
}

export default Issues;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../partials/Partial.Sidebar';
import Header from '../partials/Partial.Header';

import Details from './subpages/issues/Sub.Issues.Details';
import Viewer from './subpages/issues/Sub.Issues.Viewer';
import IssuesEntry from './subpages/issues/Sub.Issues.Entry';



function Issues() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    setIsPopup(window.opener != null);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {!isPopup && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className="maincontent relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full secondaryDark">
        {!isPopup && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={"Issues"} />}
        <main className="w-full">
          <div className="pt-4 w-full">
            <Routes>
              <Route index element={<IssuesEntry />} />
              <Route path="viewer/:issueId" element={<Viewer />} />
              <Route path=":issueId/*" element={<Details />} />
              {/* You can add more subroutes here if needed */}
            </Routes>
            <Outlet />
          </div>

        </main>



      </div>
    </div>
  );
}

export default Issues;
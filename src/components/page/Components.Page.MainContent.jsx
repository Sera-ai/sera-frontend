import React, { useState, useEffect } from "react";

import Sidebar from "../../partials/Partial.Sidebar";
import Header from "../../partials/Partial.Header";

function MainContent({
  sidebarOpen,
  setSidebarOpen,
  isPopup,
  title,
  transparent,
  children,
}) {
  return (
    <div className="flex h-full overflow-hidden gap-1">
      {!isPopup && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          transparent={transparent}
        />
      )}
      <div className="maincontent relative flex flex-col flex-1 overflow-hidden w-full h-full gap-1">
        {!isPopup && (
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            transparent={transparent} /*title={title}*/
          />
        )}
        <main id="mainContent" className="flex-grow overflow-y-hidden h-full w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainContent;

import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../partials/Partial.Sidebar";
import Header from "../../partials/Partial.Header";
import { AppContext } from "../../provider/Provider.State";

function MainContent({
  sidebarOpen,
  setSidebarOpen,
  isPopup,
  title,
  transparent,
  children,
  tier = 0,
}) {
  const { nestedVisible } = useContext(AppContext);
  return (
    <div className="flex h-full overflow-hidden gap-1">
      {!isPopup && nestedVisible <= tier && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          transparent={transparent}
        />
      )}
      <div className="maincontent relative flex flex-col flex-1 overflow-hidden w-full h-full gap-1">
        {!isPopup && nestedVisible <= tier && (
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            transparent={transparent} /*title={title}*/
          />
        )}
        <main
          id="mainContent"
          className="flex-grow overflow-y-hidden h-full w-full"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainContent;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../partials/Partial.Sidebar';
import Header from '../partials/Partial.Header';

import EditorEntry from './subpages/editor/Sub.Editor.Entry';



function Editor() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isPopup, setIsPopup] = useState(false);

    useEffect(() => {
        setIsPopup(window.opener != null);
    }, []);

    return (
        <div className="flex h-full overflow-hidden">
            {!isPopup && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
            <div className="maincontent relative flex flex-col flex-1 overflow-x-hidden w-full secondaryDark h-full">
                {!isPopup && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={"Documentation Editor"} />}
                <main className="flex-grow overflow-y-hidden">
                    <div className="h-full pt-4 w-full">
                        <Routes>
                            <Route index element={<EditorEntry />} />
                            {/* You can add more subroutes here if needed */}
                        </Routes>
                        <Outlet />
                    </div>

                </main>



            </div>
        </div>
    );
}

export default Editor;
import React, { useState, useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../partials/Partial.Sidebar';
import Catbar from '../partials/catalog/Catalog.Sidebar';
import Header from '../partials/Partial.Header';

import Home from './subpages/catalog/Sub.Catalog.Home';
import Entry from './subpages/catalog/Sub.Catalog.Entry';
import { AppContext } from '../provider/Provider.State';

function Catalog() {

  const { dummyOas } = useContext(AppContext)

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [oas, setOas] = useState(dummyOas);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Catbar oas={oas} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full items-center">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={"Catalog"} />

        <main className="w-full" style={{ maxWidth: '1220px' }}>
          <div className="py-8 w-full">

            <Routes>
              <Route index element={<Home />} />
              <Route path=":host/*" element={<Entry oas={oas} setOas={setOas} />} />
              {/* You can add more subroutes here if needed */}
            </Routes>
            <Outlet />
          </div>
        </main>



      </div>
    </div>
  );
}

export default Catalog;
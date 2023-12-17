import React, { useState, useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../partials/Partial.Sidebar';
import Catbar from '../partials/catalog/Catalog.Sidebar';
import Header from '../partials/Partial.Header';

import Entry from './subpages/catalog/Sub.Catalog.Entry';
import EndpointEntry from './subpages/catalog/Sub.Catalog.Endpoint.Entry';

import { AppContext } from '../provider/Provider.State';

function Catalog() {

  const { dummyOas } = useContext(AppContext)

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [oas, setOas] = useState(dummyOas);

  return (
    <div className="flex h-full overflow-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="maincontent relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full secondaryDark">

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={"Catalog"} />

        <main className="flex-grow overflow-auto">

          <div className="pt-4 flex w-full h-full">
            <Routes>
              <Route index element={<Entry oas={oas} />} />
              <Route path=":host/*" element={<EndpointEntry oas={oas} setOas={setOas} />} />
            </Routes>
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default Catalog;
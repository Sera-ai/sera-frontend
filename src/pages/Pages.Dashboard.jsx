import React, { useState } from 'react';

import Sidebar from '../partials/Partial.Sidebar';
import Header from '../partials/Partial.Header';
import FilterButton from '../components/Components.DropdownFilter';
import Datepicker from '../components/Components.Datepicker';
import BarGraph from '../components/Components.MonthlyAnalytics';
import AnamalyList from '../components/Components.AnamalyList';
import CatalogFullList from '../components/Components.CatalogFullList';
import Banner from '../partials/Partial.Banner';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full items-center">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title={"Dashboard"} />

        <main className="w-full" style={{ maxWidth: '1220px' }}>
          <div className="py-8 w-full">

            {/* Welcome banner */}

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Bar chart (Direct vs Indirect) */}
              <BarGraph bare={false} />

              {/* Table (Top Channels) */}
              <AnamalyList bare={false} />

              {/* Card (Recent Activity) */}
              <CatalogFullList />

            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;
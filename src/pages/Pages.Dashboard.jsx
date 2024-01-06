import React, { useState } from "react";

import FilterButton from "../components/Components.DropdownFilter";
import Datepicker from "../components/Components.Datepicker";
import BarGraph from "../components/Components.MonthlyAnalytics";
import AnamalyList from "../components/Components.AnamalyList";
import InventoryFullList from "../components/Components.InventoryFullList";
import Banner from "../partials/Partial.Banner";
import MainContent from "../components/page/Components.Page.MainContent";
import CardUptime from "../components/cards/Components.Card.Uptime";
import CardLatency from "../components/cards/Components.Card.Latency";
import GitHubContributionsGraph from "../components/cards/Components.Card.Contributions";
import CardTraffic from "../components/cards/Components.Card.Traffic";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  return (
    <MainContent
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isPopup={false}
      title={title}
    >
      <div className="py-4 px-7 w-full h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-7">
          <CardUptime />
          <CardTraffic />
          <AnamalyList bare={false} />
          <CardLatency />
          <GitHubContributionsGraph />
          {/* <BarGraph bare={false} />
          <InventoryFullList filter={""} /> */}
        </div>
      </div>
      <Banner />
    </MainContent>
  );
}

export default Dashboard;

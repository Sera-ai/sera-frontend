import React, { useState } from 'react';
import Inventory from './Sub.Issues.Inventory';
import Report from './Sub.Issues.Report';
import HeaderTabs from '../../../components/Components.Header.Tabs';

function IssuesEntry() {
    const [selectedTab, setSelectedTab] = useState(0); // default selected tab
    return (
        <div className={"maincontent relative flex flex-col flex-1 overflow-x-hidden w-full secondaryDark h-full"}>
            <HeaderTabs tabs={["Inventory", "Report"]} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 1 ? (<Report />) : (<Inventory />)}
        </div>
    );
}

export default IssuesEntry;

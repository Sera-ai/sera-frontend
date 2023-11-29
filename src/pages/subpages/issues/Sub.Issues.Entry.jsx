import React, { useState } from 'react';
import Inventory from './Sub.Issues.Inventory';
import Report from './Sub.Issues.Report';

function IssuesEntry() {
    const [selectedTab, setSelectedTab] = useState(0); // default selected tab
    return (
        <div className="">
            <HeaderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 1 ? (<Report />) : (<Inventory />)}
        </div>
    );
}

export default IssuesEntry;

const HeaderTabs = ({ selectedTab, setSelectedTab }) => {

    return (
        <div className="text-white flex full-w ml-3">
            {/* Tab: All Coins */}
            <div
                className={`cursor-pointer py-1 ${selectedTab === 'Inventory' ? 'border-b-2 border-blue-300 dark:text-slate-100' : 'dark:text-slate-500'}`}
                style={{ borderColor: "#2b84ec" }}
                onClick={() => setSelectedTab(0)}
            >
                <span>Inventory</span>
            </div>

            {/* Tab: Portfolio */}
            <div
                className={`cursor-pointer py-1 ml-6 ${selectedTab === 'Report' ? 'border-b-2 border-blue-300 dark:text-slate-100' : 'dark:text-slate-500'}`}
                style={{ borderColor: "#2b84ec" }}
                onClick={() => setSelectedTab(1)}
            >
                <span>Report</span>
            </div>

            <div
                className={`cursor-pointer py-1 ml-6 ${selectedTab === 'Timeline' ? 'border-b-2 border-blue-300 dark:text-slate-100' : 'dark:text-slate-500'}`}
                style={{ borderColor: "#2b84ec" }}
                onClick={() => setSelectedTab(2)}
            >
                <span>Timeline</span>
            </div>
        </div>
    );
};
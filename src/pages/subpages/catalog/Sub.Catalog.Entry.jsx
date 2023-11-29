import React, { useState } from 'react';

import Analytics from '../../../partials/catalog/Catalog.Analytics';
import Documentation from '../../../partials/catalog/Catalog.Documentation';

function Entry({ oas, setOas }) {

    const [selectedTab, setSelectedTab] = useState(0); // default selected tab


    return (
        <div className="">
            <HeaderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 1 ? (<Documentation oas={oas} setOas={setOas} />) : (<Analytics oas={oas} setOas={setOas} />)}
        </div>
    );
}

export default Entry;

const HeaderTabs = ({ selectedTab, setSelectedTab }) => {

    return (
        <div className="text-white flex full-w ml-3 text-sm">
            {/* Tab: All Coins */}
            <div
                className={`cursor-pointer py-1 ${selectedTab === 'Analytics' ? 'border-b-2 border-blue-300 dark:text-slate-100' : 'dark:text-slate-500'}`}
                style={{ borderColor: "#2b84ec" }}
                onClick={() => setSelectedTab(0)}
            >
                <span>Analytics</span>
            </div>

            {/* Tab: Portfolio */}
            <div
                className={`cursor-pointer py-1 ml-4 ${selectedTab === 'Documentation' ? 'border-b-2 border-blue-300 dark:text-slate-100' : 'dark:text-slate-500'}`}
                style={{ borderColor: "#2b84ec" }}
                onClick={() => setSelectedTab(1)}
            >
                <span>Documentation</span>
            </div>
        </div>
    );
};
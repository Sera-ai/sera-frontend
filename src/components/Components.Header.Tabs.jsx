import React, { useState } from 'react';

const HeaderTabs = ({ tabs, selectedTab, setSelectedTab, subBar = false }) => {
    return (
        <div className={`text-white flex full-w tabHeader text-sm px-4`} style={{ borderBottomWidth: subBar ? 0 : 1, paddingTop: subBar ? 22 : 0 }}>
            {/* Tab: All Coins */}
            {tabs.map((tab, int) =>
            (<div
                className={`cursor-pointer py-4 px-2 mx-2 ${selectedTab === int ? 'border-b-2 border-blue-300 dark:text-slate-100' : 'dark:text-slate-500'}`}
                style={{ borderColor: "#2b84ec" }}
                onClick={() => setSelectedTab(int)}
            >
                <span>{tab}</span>
            </div>)
            )}
        </div>
    );
};

export default HeaderTabs
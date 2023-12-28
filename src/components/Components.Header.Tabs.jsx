import React, { useState } from 'react';

const HeaderTabs = ({ tabs, selectedTab, setSelectedTab, subBar = false }) => {
    return (
        <div className={`text-white flex full-w tabHeader text-sm px-4`}>
            {/* Tab: All Coins */}
            {tabs.map((tab, int) =>
            (<div
                className={`cursor-pointer py-4 px-2 mx-2 ${selectedTab === int ? 'tabHeaderSelect' : 'tabHeaderNoSelect'}`}
                onClick={() => setSelectedTab(int)}
            >
                <span>{tab}</span>
            </div>)
            )}
        </div>
    );
};

export default HeaderTabs
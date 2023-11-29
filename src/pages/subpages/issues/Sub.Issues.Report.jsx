import React, { useState, useEffect } from 'react';
import AnamalyList from '../../../components/Components.AnamalyList';
import PercentageChart from '../../../components/Components.AnamalyBreakdown';
import AnamalyActions from '../../../components/Components.AnamalyActions';

function Report() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Table (Top Channels) */}
            <PercentageChart />
            <AnamalyActions />
            <AnamalyList bare={false} full={true} />
        </div>
    );
}

export default Report;
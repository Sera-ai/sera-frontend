import React, { useState } from 'react';

import CatalogFullList from '../../../components/Components.CatalogFullList';

function CatalogHome() {

    return (
        <div className="grid grid-cols-12 gap-6">
            <CatalogFullList />
        </div>
    );
}

export default CatalogHome;
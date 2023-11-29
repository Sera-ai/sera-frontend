import React, { useState, useContext } from 'react';
import HeaderTabs from '../../../components/Components.Header.Tabs';
import CatalogFullList from '../../../components/Components.CatalogFullList';
import CatalogSidebar from '../../../partials/catalog/Catalog.Sidebar';
import Header from '../../../components/Components.Header.Title';
import { AppContext } from '../../../provider/Provider.State';

function CatalogEntry({ oas }) {
    const [selectedTab, setSelectedTab] = useState(0); // default selected tab
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const [filter, setFilter] = useState('');
    const [columns, setColumns] = useState([]);
    const { issueInventory } = useContext(AppContext);

    const existingColumns = issueInventory.length > 0 ? Object.keys(issueInventory[0]) : []

    return (
        <div className='w-full h-full'>
            <HeaderTabs tabs={["Catalog"]} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            <div className='flex w-full h-full'>
                <div className="col-span-full border-slate-200 dark:border-slate-700 w-full h-full" >
                    <Header
                        title={"Endpoint Inventory"}
                        subtitle={"Below is an inventory list of all managed endpoints"}
                        filter={filter}
                        setFilter={setFilter}
                        setColumns={setColumns}
                        existingColumns={existingColumns}
                        columns={columns}
                    >
                        <CatalogFullList filter={filter} setFilter={setFilter} columns={columns} data={issueInventory} />
                    </Header>
                </div >
                <CatalogSidebar oas={oas} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            </div>
        </div>
    );
}

export default CatalogEntry;

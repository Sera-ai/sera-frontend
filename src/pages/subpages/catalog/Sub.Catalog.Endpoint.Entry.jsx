import React, { useState, useContext, useEffect } from 'react';

import Analytics from '../../../partials/catalog/Catalog.Analytics';
import Documentation from '../../../partials/catalog/Catalog.Documentation';
import Header from '../../../components/Components.Header.Title';
import { AppContext } from '../../../provider/Provider.State';
import HeaderTabs from '../../../components/Components.Header.Tabs';
import CatalogSidebar from '../../../partials/catalog/Catalog.Sidebar';
import { useNavigate } from 'react-router-dom';


function Entry({ oas, setOas }) {

    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(1); // default selected tab
    const [subSelectedTab, setSubSelectedTab] = useState(0); // default selected tab
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const [filter, setFilter] = useState('');
    const [columns, setColumns] = useState([]);
    const { issueInventory } = useContext(AppContext);

    useEffect(() => {
        if (selectedTab === 0) {
            navigate('/catalog');
        }
    }, [selectedTab]); // Dependency array includes selectedTab

    const existingColumns = issueInventory.length > 0 ? Object.keys(issueInventory[0]) : []

    return (
        <div className='w-full overflow-y-hidden h-full'>
            <HeaderTabs tabs={["Catalog", "api.sample.com"]} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            <div className='flex w-full h-full '>
                <div className="col-span-full border-slate-200 dark:border-slate-700 w-full h-full" >
                    <Header subBar>
                        <HeaderTabs tabs={["Analytics", "Documentation"]} selectedTab={subSelectedTab} setSelectedTab={setSubSelectedTab} subBar />
                        {subSelectedTab === 1 ? (<Documentation oas={oas} setOas={setOas} />) : (<Analytics oas={oas} setOas={setOas} />)}
                    </Header>
                </div >
                <CatalogSidebar oas={oas} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            </div>
        </div>
    );
}

export default Entry;
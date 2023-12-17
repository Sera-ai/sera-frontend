import React, { useState, useEffect, useContext } from 'react';
import IssuesTable from '../../../partials/issues/Issues.Table';
import { AppContext } from '../../../provider/Provider.State';
import Header from '../../../components/Components.Header.Title';

function Inventory() {

    const [filter, setFilter] = useState('');
    const [columns, setColumns] = useState([]);
    const { issueInventory } = useContext(AppContext);

    const existingColumns = issueInventory.length > 0 ? Object.keys(issueInventory[0]) : []

    return (
        <div className="flex-grow overflow-y-hidden" >
            <div className="col-span-full border-slate-200 dark:border-slate-700 w-full h-full" >
                <Header
                    title={"Issue Inventory"}
                    subtitle={"Below is an inventory list of any issues that have not been resolved"}
                    filter={filter}
                    setFilter={setFilter}
                    setColumns={setColumns}
                    existingColumns={existingColumns}
                    columns={columns}
                >
                    <IssuesTable filter={filter} setFilter={setFilter} columns={columns} data={issueInventory} />
                </Header>
            </div >
        </div>
    );
}


export default Inventory;
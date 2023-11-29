import React, { useState, useEffect, useContext } from 'react';
import IssuesTable from '../../../partials/issues/Issues.Table';
import DropdownFilter from '../../../components/Components.DropdownFilter';
import { AppContext } from '../../../provider/Provider.State';

function Inventory() {

    const [filter, setFilter] = useState('');
    const [columns, setColumns] = useState([]);
    const { issueInventory } = useContext(AppContext);

    const existingColumns = issueInventory.length > 0 ? Object.keys(issueInventory[0]) : []

    return (
        <div className=" w-full" >
            <div className="col-span-full mainDark shadow-lg rounded-lg border border-slate-200 dark:border-slate-700" >
                <Header filter={filter} setFilter={setFilter} setColumns={setColumns} existingColumns={existingColumns} columns={columns} />
                <div>
                    {/* Table */}
                    <div className="overflow-x-auto secondaryDark rounded-xl m-2 p-2 flex flex-col" style={{ minHeight: "500px" }}>
                        <IssuesTable filter={filter} setFilter={setFilter} columns={columns} data={issueInventory} />
                    </div>
                </div>
            </div >
        </div>
    );
}

function Header({ filter, setFilter, setColumns, existingColumns, columns }) {
    return (
        <header className="px-4 pt-4">
            <div className="flex justify-between items-center">
                <div className="">
                    <div className="mb-1">
                        <div className={"ml-2 dark:text-slate-100"}>Issue Inventory</div>
                        <div className={"ml-2 text-xs"}>Below is an inventory list of any issues that have not been resolved</div>
                    </div>
                </div>

                <div className="space-x-2.5 flex justify-center">
                    <form className="border-b border-slate-200 dark:border-slate-700">
                        <div className="relative">
                            <input
                                className="w-full text-sm px-1 dark:text-slate-300 mainDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none"
                                type="search"
                                placeholder="Filter Inventory Items"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                    </form>
                    <DropdownFilter setColumns={setColumns} existingColumns={existingColumns} columns={columns} align={true} />
                </div>
            </div>
        </header >
    )
}

export default Inventory;
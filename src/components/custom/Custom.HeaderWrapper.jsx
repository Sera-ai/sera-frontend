import React, { useState } from 'react';
import Header from './Custom.Header.Title';


const HeaderWrapper = ({ filter = null, setFilter = null, setColumns = null, columns = [], children, header = "Documentation Inventory", subheader =  "Below is a list of Documented API's managed by Sera"}) => {
    return (
        <div className="flex-grow overflow-y-hidden" >
            <div className="col-span-full border-slate-200 dark:border-slate-700 w-full h-full" >
                <Header
                    title={header}
                    subtitle={subheader}
                    filter={filter}
                    setFilter={setFilter}
                    setColumns={setColumns}
                    columns={columns}
                >
                    {children}
                </Header>
            </div >
        </div>
    )
}

export default HeaderWrapper;

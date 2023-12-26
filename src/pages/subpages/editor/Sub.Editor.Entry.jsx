import React, { useContext, useState } from 'react';
import HeaderTabs from '../../../components/Components.Header.Tabs';
import HostFullList from '../../../components/Components.HostsFullList';
import HeaderWrapper from '../../../components/Components.HeaderWrapper';
import ImportData from './Sub.Editor.Import';
import { AppContext } from '../../../provider/Provider.State';

function            EditorEntry() {
    const [selectedTab, setSelectedTab] = useState(0); // default selected tab
    const [filter, setFilter] = useState('');
    const [columns, setColumns] = useState([]);


    const getSelectedTab = () => {
        switch (selectedTab) {
            case 0: return (
                <HeaderWrapper
                    filter={filter}
                    setFilter={setFilter}
                    setColumns={setColumns}
                    columns={columns}>
                    <HostFullList setFilter={setFilter} filter={filter} />
                </HeaderWrapper>)
            case 1: return (<ImportData />)
        }
    }
    return (
        <div className={"maincontent relative flex flex-col flex-1 overflow-hidden w-full secondaryDark h-full"}>
            <HeaderTabs tabs={["Manage", "Import"]} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className='flex w-full h-full'>
                {getSelectedTab()}
            </div>
        </div>
    );
}


export default EditorEntry;

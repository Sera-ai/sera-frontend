import React, { useState, useContext, useEffect } from 'react';

import Analytics from '../../../partials/catalog/Catalog.Analytics';
import Documentation from '../../../partials/catalog/Catalog.Documentation';
import Header from '../../../components/Components.Header.Title';
import { AppContext } from '../../../provider/Provider.State';
import HeaderTabs from '../../../components/Components.Header.Tabs';
import CatalogSidebar from '../../../partials/catalog/Catalog.Sidebar';
import { useNavigate } from 'react-router-dom';
import EditorUpload from '../../../partials/editor/Editor.Upload';
import EditorOasViewer from '../../../partials/editor/Editor.OasViewer';
import EditorHeader from '../../../partials/editor/Editor.Header';
import EditorServer from '../../../partials/editor/Editor.Server';


function ImportData() {

    const [selectedTab, setSelectedTab] = useState(0);
    const { dummyOas } = useContext(AppContext)
    const [oas, setOas] = useState({})

    const getSelectedTab = () => {
        switch (selectedTab) {
            case 0: return (<EditorUpload setOas={setOas} dummyOas={dummyOas} />)
            case 1: return (<EditorHeader setOas={setOas} oas={oas} />)
            case 2: return (<EditorServer setOas={setOas} oas={oas} />)
        }
    }
    return (
        <div className='w-full overflow-y-hidden h-full'>
            <div className='flex w-full h-full '>
                <div className="col-span-full border-slate-200 dark:border-slate-700 w-full h-full" >
                    <Header subBar>
                        <HeaderTabs tabs={["Upload", "Header", "Servers", "Security", "Tags", "Main", "Schemas", "Export"]} selectedTab={selectedTab} setSelectedTab={setSelectedTab} subBar />
                        <div className={"flex flex-grow overflow-y-hidden"}>
                            <div className='w-1/2 h-full overflow-y-scroll'>
                                {getSelectedTab()}
                            </div>
                            <div className='w-1/2 h-full'>
                                <EditorOasViewer oas={oas} />
                            </div>
                        </div>
                    </Header>
                </div >
            </div>
        </div>
    );
}

export default ImportData;
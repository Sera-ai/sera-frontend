import React, { useState, useContext, useEffect } from 'react';

import Header from '../../../components/custom/Custom.Header.Title';
import { AppContext } from '../../../provider/Provider.State';
import HeaderTabs from '../../../components/custom/Custom.Header.Tabs';
import EditorUpload from '../../../pages/subpages/editor/partials/Partials.Editor.Upload';
import EditorOasViewer from '../../../pages/subpages/editor/partials/Partials.Editor.OasViewer';
import EditorHeader from '../../../pages/subpages/editor/partials/Partials.Editor.Header';
import EditorServer from '../../../pages/subpages/editor/partials/Partials.Editor.Server';


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